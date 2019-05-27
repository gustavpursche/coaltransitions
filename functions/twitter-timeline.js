const Twit = require('twit');

const Client = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true
});

const getTweets = () =>
  new Promise((resolve, reject) => {
    Client.get(
      'statuses/user_timeline',
      {
        screen_name: 'CoalTransitions',
        count: 9,
        tweet_mode: 'extended'
      },
      (error, data) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      }
    );
  });

exports.handler = async () => {
  try {
    const tweets = await getTweets();

    return {
      statusCode: 200,
      body: JSON.stringify(tweets)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Fetching of tweets failed'
    };
  }
};