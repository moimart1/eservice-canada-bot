const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");
const cheerio = require("cheerio");
const fs = require("fs");

axios.defaults.withCredentials = true;

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));
const eServiceUrl =
  "https://eservices.canada.ca/fr/reservation/application/?booking-privacy=true";

async function main() {
  const axiosOptions = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
    },
  };

  await client.get(
    "https://eservices.canada.ca/en/assets/libs/eServiceFormHelpers.js",
    axiosOptions
  );

  const result = await client.get(eServiceUrl, axiosOptions);
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

  const params = {
    EntityName: "esdc_booking",
    languageofservice: "564190001", // FR
    bookingtype: "564190001", // Passport
    earliesttraveldaterange: "564190003",
    numberofapplicationspassport: "1",
    passportraapplicable: "1",
    numberofapplicantsbio: "0",
    sessionexpiryon: "2022-06-09T23:52:13.0000000Z", //encodeURIComponent(sessionExpiryOn.toISOString()),
    portalbooking: "1",
    privacystatementaccepted: "1",
    browseragent:
      "Browser+CodeName%3A+Mozilla%0D%0ABrowser+Name%3A+Netscape%0D%0ABrowser+Version%3A+5.0+%28Macintosh%29%0D%0ACookies+Enabled%3A+true%0D%0ABrowser+Language%3A+fr%0D%0ABrowser+Online%3A+true%0D%0APlatform%3A+MacIntel%0D%0AUser-agent+header%3A+Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10.15%3B+rv%3A101.0%29+Gecko%2F20100101+Firefox%2F101.0",
  };

  bookingData.set(
    "__EVENTTARGET",
    "ctl00$ContentContainer$WebFormControl_de5496ccf543ec118c62000d3a09fbc2$NextButton"
  );
  bookingData.forEach((value, key) => {
    for (const [keySearch, replacementValue] of Object.entries(params)) {
      if (key.endsWith(keySearch)) {
        bookingData.set(key, replacementValue);
      }
    }
  });

  const resultBooking = await client.post(
    eServiceUrl,
    bookingData,
    axiosOptions
  );

  const pageBooking = cheerio.load(resultBooking.data);
  console.log(pageBooking("#EntityFormView_EntityID").val());
  fs.writeFile("scraping-page2.html", resultBooking.data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("done2");
  });
}

main();
