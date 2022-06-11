const { TwitterApi } = require("twitter-api-v2");
const config = require("../config").twitter;

const client = new TwitterApi(config);

module.exports.getExistingTweets = async (start_time) => {
  const meUser = await client.v2.me();
  return await client.v2.userTimeline(meUser.data.id, {
    exclude: ["retweets", "replies"],
    start_time,
  });
};

module.exports.postTweet = async (text) => {
  const { data: createdTweet } = await client.v2.tweet(text);
  return createdTweet;
};
