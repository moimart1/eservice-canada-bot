const { TwitterApi } = require("twitter-api-v2");
const readline = require("readline");

const { accounts, ...config } = require("../config").twitter;
const officeClients = {};

function getClient(officeKey) {
  if (!officeKey) return new TwitterApi(config);
  if (accounts[officeKey] && accounts[officeKey].accessToken) {
    if (!officeClients[officeKey]) {
      officeClients[officeKey] = new TwitterApi({
        ...accounts[officeKey],
        appKey: config.appKey,
        appSecret: config.appSecret,
      });
    }

    return officeClients[officeKey];
  }

  throw new Error(`Unable to find a client to use Twitter with office key ${officeKey}`);
}

module.exports.getExistingTweets = async (officeKey, { start_time }) => {
  const client = getClient(officeKey);
  const meUser = await client.v2.me();

  return (
    await getClient().v2.userTimeline(meUser.data.id, {
      exclude: ["retweets", "replies"],
      start_time,
    })
  ).data;
};

module.exports.postTweet = async (officeKey, text) => {
  const client = getClient(officeKey);
  const { data: createdTweet } = await client.v2.tweet(text);

  return createdTweet;
};

async function generateAccess() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Generate auth link
  const authLink = await getClient().generateAuthLink("oob", {
    authAccessType: "write",
  });
  console.log(`Got to ${authLink.url}`);

  // Temporary client
  const connecterClient = new TwitterApi({
    appKey: config.appKey,
    appSecret: config.appSecret,
    accessToken: authLink.oauth_token,
    accessSecret: authLink.oauth_token_secret,
  });

  rl.question("PIN ? ", async (pin) => {
    const { accessToken, accessSecret, userId, client: appClient } = await connecterClient.login((pin ?? "").trim());

    console.log(`Connected with user #${userId} !\n accessToken: ${accessToken}\n accessSecret: ${accessSecret}\n`);
    console.log(await appClient.v2.me());
    process.exit(0);
  });
}

if (require.main === module) {
  generateAccess();
}
