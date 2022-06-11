module.exports = {
  twitter: {
    appKey: process.env.TWITTER_APP_KEY || "",
    appSecret: process.env.TWITTER_APP_SECRET || "",
    accessToken: process.env.TWITTER_APP_ACCESS_TOKEN || "",
    accessSecret: process.env.TWITTER_APP_ACCESS_SECRET || "",
  },
  eservice: {
    bookingUrl:
      "https://eservices.canada.ca/en/reservation/application/?booking-privacy=true",
    getTimeSlotsUrl:
      "https://eservice-api-production.azurewebsites.net/api/GetAvailableTimeslots",
    defaultBookingId: process.env.ESERVICE_DEFAULT_BOOKING_ID || "",
    bookingServiceOfferingIds: "57af4796-67ab-ea11-a812-000d3af4f03d", // Passport service
    languageOptionsKey: "french",
    bookingTypeOptionsKey: "passport service",
    earliestTravelDateRangeOptionsKey: "travel between 6 and 45 business days",
    officeIds: {
      montreal: "2f0a32f7-bcac-ea11-a812-000d3af4316a",
      pointeclaire: "2d0a32f7-bcac-ea11-a812-000d3af4316a",
      saintlaurent: "290a32f7-bcac-ea11-a812-000d3af4316a",
      laval: "310a32f7-bcac-ea11-a812-000d3af4316a",
    },
  },
};
