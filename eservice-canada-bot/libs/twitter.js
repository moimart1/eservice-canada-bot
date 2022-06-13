const { TwitterApi } = require("twitter-api-v2");
const readline = require("readline");

const { twitter, officeKey } = require("../config");
const { accounts, ...config } = twitter;

const rootClient = new TwitterApi(config);
const officeClients = Object.values(officeKey).reduce((clients, key) => {
  const officeConfig = accounts[key];
  if (officeConfig.accessToken && officeConfig.accessSecret) {
    clients[key] = new TwitterApi({
      ...officeConfig,
      appKey: config.appKey,
      appSecret: config.appSecret,
    });
  }

  return clients;
}, {});

function getClient(officeKey) {
  if (!officeKey) return rootClient;
  if (officeClients[officeKey]) return officeClients[officeKey];

  throw new Error(
    `Unable to find a client to use Twitter with office key ${officeKey}`
  );
}

module.exports.getExistingTweets = async (officeKey, { start_time }) => {
  const client = getClient(officeKey);
  const meUser = await client.v2.me();

  return (
    await rootClient.v2.userTimeline(meUser.data.id, {
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
  const authLink = await rootClient.generateAuthLink("oob", {
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
    const {
      accessToken,
      accessSecret,
      userId,
      client: appClient,
    } = await connecterClient.login((pin ?? "").trim());

    console.log(
      `Connected with user #${userId} !\n accessToken: ${accessToken}\n accessSecret: ${accessSecret}\n`
    );
    console.log(await appClient.v2.me());
    process.exit(0);
  });
}

if (require.main === module) {
  const last48hoursDate = new Date(
    new Date().getTime() - 20 * 365 * 24 * 60 * 60 * 1000
  );
  (async () => {
    const tweets = await this.getExistingTweets(null, {
      start_time: "2020-11-06T00:00:00-00:00",
    });
    console.log(tweets);
  })();
  return;
  generateAccess();
}
