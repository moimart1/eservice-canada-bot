const { officeKey } = require("./config");
const config = require("./config");
const {
  getAvailableSlots,
  getBookingId,
  isBookingId,
} = require("./libs/eservice");
const { getExistingTweets, postTweet } = require("./libs/twitter");

let response;
const cache = {
  lastUpdatedAt: new Date(),
  lastBookingId: "",
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    console.log("Read cache:", cache);
    if (
      !isBookingId(cache.lastBookingId) ||
      // 24h to ms
      new Date() - cache.lastUpdatedAt > 24 * 60 * 60 * 1000
    ) {
      console.log("Retrieving booking ID...");
      cache.lastBookingId = await getBookingId();
      cache.lastUpdatedAt = new Date();
      console.log(`Retrieve new booking ID: ${cache.lastBookingId}`);
    }

    const officesSlots = await Promise.all(
      Object.keys(config.eservice.officeIds).map(async (officeKey) => {
        const result = { officeKey, slots: [], error: null };

        try {
          console.log(`Getting available slots for ${officeKey} office...`);
          result.slots =
            (await getAvailableSlots(
              config.eservice.officeIds[officeKey],
              cache.lastBookingId
            )) ?? [];
          console.log(
            `Get ${result.slots.length} available slots for ${officeKey} office`
          );
        } catch (err) {
          result.error = err;
          if (err.response && err.response.status === 502) {
            // General error with eService
            cache.lastBookingId = ""; // reset for next time
            return; // Nothing more to do
          }

          console.error(
            `Unable to get available slots for ${officeKey} office:`,
            err
          );
        }

        return result;
      })
    );

    const last48hoursDate = new Date(
      new Date().getTime() - 2 * 24 * 60 * 60 * 1000
    ); // 48h to ms
    // Manage tweets
    await Promise.all(
      officesSlots.map(async (officesSlot) => {
        try {
          console.log(
            `Getting existing tweets for ${officesSlot.officeKey} office...`
          );
          const existingTweets = await getExistingTweets(
            officesSlot.officeKey,
            {
              start_time: last48hoursDate.toISOString(),
            }
          );

          if (
            !Array.isArray(existingTweets.data) ||
            (Array.isArray(existingTweets.data) &&
              existingTweets.data.length === 0)
          ) {
            console.log(
              `No tweet for ${officesSlot.officeKey} office since last 48 hours, posting a new tweet...`
            );
            await postTweet(
              officesSlot.officeKey,
              `J'ai vérifié les rendez vous le ${new Date().toISOString()} mais pour l'instant je ne trouve rien...`
            );
            return;
          }

          // Tweets are ordered from newest to oldest
          const lastTweet = existingTweets.data.at(0).text;
          console.log(`Get last tweet: ${lastTweet}`);

          if (
            officesSlot.error ||
            !Array.isArray(officesSlot.slots) ||
            officesSlot.slots.length === 0
          ) {
            console.log(
              `No availabilities for ${officesSlot.officeKey} office`
            );
            return; // Nothing to do
          }

          let availabilityTweet =
            "Nouvelles disponibilités pour un RDV Passeport:";
          let newAvailability = false;
          for (const slot of officesSlot.slots) {
            if (!slot.AvailableWorkstations) {
              console.error(`Unable to find expected AvailableWorkstations`);
              continue;
            }

            for (const [day, availableWorkstation] of Object.entries(
              slot.AvailableWorkstations
            )) {
              if (lastTweet.includes(day)) continue; // Don't log already tweeted date
              const slotCount = Array.isArray(availableWorkstation)
                ? availableWorkstation.length
                : 0;
              const availability = `\n - ${day}: ${slotCount} place(s)`;
              if (availabilityTweet.length + availability.length < 140) {
                // Add only if tweet size is not exceeded
                availabilityTweet += availability;
                newAvailability = true;
              }
            }
          }

          if (newAvailability) {
            console.log(
              `Posting Tweet with availabilities for ${officesSlot.officeKey} office...`
            );
            await postTweet(officesSlot.officeKey, availabilityTweet);
          } else {
            console.log(`Already posted for ${officesSlot.officeKey} office`);
          }
        } catch (err) {
          console.log(err);
        }
      })
    );

    response = {
      statusCode: 200,
      body: JSON.stringify(officesSlots),
    };
  } catch (err) {
    console.error(err);
    return err;
  }

  return response;
};
