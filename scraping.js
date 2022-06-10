const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const client = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
  },
});

const eServiceUrl =
  "https://eservices.canada.ca/en/reservation/application/?booking-privacy=true";
const eServiceTimeSlotsUrl =
  "https://eservice-api-production.azurewebsites.net/api/GetAvailableTimeslots";

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

async function main() {
  const result = await client.get(eServiceUrl);
  fs.writeFile("scraping-page1.html", result.data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("done1");
  });

  const $ = cheerio.load(result.data);
  const bookingData = new URLSearchParams($("#liquid_form").serialize());
  const sessionExpiryOn = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 min to ms

  const languageOptions = getHtmlOptionsFromSelect(
    $,
    "#esdc_languageofservice"
  );

  const bookingTypeOptions = getHtmlOptionsFromSelect($, "#esdc_bookingtype");
  const earliestTravelDateRangeOptions = getHtmlOptionsFromSelect(
    $,
    "#esdc_earliesttraveldaterange"
  );

  const params = {
    EntityName: "esdc_booking",
    languageofservice: languageOptions.french, // FR
    bookingtype: bookingTypeOptions["passport service"], // Passport
    earliesttraveldaterange:
      earliestTravelDateRangeOptions["travel between 6 and 45 business days"], // 9 to 45 jrs
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

  bookingData.set("__EVENTTARGET", $("#NextButton").attr("name"));
  bookingData.forEach((value, key) => {
    for (const [keySearch, replacementValue] of Object.entries(params)) {
      if (key.endsWith(keySearch)) {
        bookingData.set(key, replacementValue);
      }
    }
  });

  const resultBooking = await client.post(eServiceUrl, bookingData);

  const pageBooking = cheerio.load(resultBooking.data);
  const bookingId = pageBooking("#EntityFormView_EntityID").val();
  console.log(bookingId);
  fs.writeFile("scraping-page2.html", resultBooking.data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("done2");
  });

  const data = {
    CrmOrigin: "eservices",
    BookingId: bookingId,
    OfficeIds: [
      //"2d0a32f7-bcac-ea11-a812-000d3af4316a", // Pointe claire
      // "310a32f7-bcac-ea11-a812-000d3af4316a", // Laval
      // "290a32f7-bcac-ea11-a812-000d3af4316a", // Saint laurent
      "2f0a32f7-bcac-ea11-a812-000d3af4316a", // Montreal
    ],
    AdditionalParameters: {
      UserLocalTime: new Date().toISOString(),
      BookingServiceOfferingIds: ["57af4796-67ab-ea11-a812-000d3af4f03d"],
    },
  };

  const resultTimeSlot = await client.post(eServiceTimeSlotsUrl, data);
  fs.writeFile(
    "result.json",
    JSON.stringify(JSON.parse(resultTimeSlot.data)),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("done3");
    }
  );
}

main();
