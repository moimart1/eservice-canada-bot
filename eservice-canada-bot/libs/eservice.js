const axios = require("axios");
const cheerio = require("cheerio");

const config = require("../config").eservice;

const bookingIdRegex = new RegExp(
  "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
);
const client = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
  },
});

function getHtmlOptionsFromSelect(root, selector) {
  const result = {};
  root(selector)
    .children("option")
    .each((id, element) => {
      const option = root(element);
      return (result[option.text().toLowerCase()] = option.attr("value"));
    });

  return result;
}

module.exports.isBookingId = (bookingId) => {
  return bookingIdRegex.test(bookingId);
};

module.exports.getBookingId = async () => {
  const resultInitial = await client.get(config.bookingUrl);
  const pageInitial = cheerio.load(resultInitial.data);

  const bookingData = new URLSearchParams(
    pageInitial("#liquid_form").serialize()
  );
  const sessionExpiryOn = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 min to ms
  const languageOptions = getHtmlOptionsFromSelect(
    pageInitial,
    "#esdc_languageofservice"
  );
  const bookingTypeOptions = getHtmlOptionsFromSelect(
    pageInitial,
    "#esdc_bookingtype"
  );
  const earliestTravelDateRangeOptions = getHtmlOptionsFromSelect(
    pageInitial,
    "#esdc_earliesttraveldaterange"
  );

  const params = {
    EntityName: "esdc_booking",
    languageofservice: languageOptions[config.languageOptionsKey], // FR
    bookingtype: bookingTypeOptions[config.bookingTypeOptionsKey], // Passport
    earliesttraveldaterange:
      earliestTravelDateRangeOptions[config.earliestTravelDateRangeOptionsKey], // 9 to 45 jrs
    numberofapplicationspassport: "1",
    passportraapplicable: "1",
    numberofapplicantsbio: "0",
    sessionexpiryon: sessionExpiryOn
      .toISOString()
      .replace(/\.[0-9]+Z/, ".0000000Z"),
    portalbooking: "1",
    privacystatementaccepted: "1",
    browseragent:
      "Browser+CodeName%3A+Mozilla%0D%0ABrowser+Name%3A+Netscape%0D%0ABrowser+Version%3A+5.0+%28Macintosh%29%0D%0ACookies+Enabled%3A+true%0D%0ABrowser+Language%3A+fr%0D%0ABrowser+Online%3A+true%0D%0APlatform%3A+MacIntel%0D%0AUser-agent+header%3A+Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10.15%3B+rv%3A101.0%29+Gecko%2F20100101+Firefox%2F101.0",
  };

  bookingData.set("__EVENTTARGET", pageInitial("#NextButton").attr("name"));
  bookingData.forEach((value, key) => {
    for (const [keySearch, replacementValue] of Object.entries(params)) {
      if (key.endsWith(keySearch)) {
        bookingData.set(key, replacementValue);
      }
    }
  });

  const resultBooking = await client.post(config.bookingUrl, bookingData);
  const pageBooking = cheerio.load(resultBooking.data);
  const bookingId = pageBooking("#EntityFormView_EntityID").val();

  if (!this.isBookingId(bookingId))
    throw new Error(`Invalid booking ID: ${bookingId}`);

  return bookingId;
};

module.exports.getAvailableSlots = async (officeId, bookingId) => {
  if (!officeId || !bookingId) {
    throw new Error(
      `Missing parameters in getAvailableSlots(${officeId}, ${bookingId})`
    );
  }

  const data = {
    CrmOrigin: "eservices",
    BookingId: bookingId,
    OfficeIds: [officeId],
    AdditionalParameters: {
      UserLocalTime: new Date().toISOString(),
      BookingServiceOfferingIds: [config.bookingServiceOfferingIds],
    },
  };

  const resultTimeSlot = await client.post(config.getTimeSlotsUrl, data);
  return JSON.parse(resultTimeSlot.data);
};
