const { TwitterApi } = require("twitter-api-v2");

async function main() {
  // Obtain user client
  const client = new TwitterApi({
    appKey: "TODO",
    appSecret: "TODO",
    accessToken: "TODO",
    accessSecret: "TODO",
  });

  const meUser = await client.v2.me({ expansions: ["pinned_tweet_id"] });
  const userTimeline = await client.v2.userTimeline(meUser.data.id, {
    exclude: ["retweets", "replies"],
  });

  for await (const tweet of userTimeline) {
    console.log(tweet);
  }

  const { data: createdTweet } = await client.v2.tweet(
    "twitter-api-v2 is awesome!",
    {
      poll: { duration_minutes: 5, options: ["Absolutely", "For sure!"] },
    }
  );

  console.log("Tweet", createdTweet.id, ":", createdTweet.text);
}

main();
