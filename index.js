require("dotenv").config();
const Octokit = require("@octokit/rest");
const request = require('request-promise');
const moment = require('moment');
const changeCase = require('change-case')

const {
  GIST_ID: gistId,
  TWITTER_USER: twitterHandle,
  TWITTER_CONSUMER_KEY: consumerKey,
  TWITTER_CONSUMER_SECRET: consumerSecret,
  TWITTER_ACCESS_TOKEN_KEY: accessTokenKey,
  TWITTER_ACCESS_TOKEN_SECRET: accessTokenSecret,
  GH_TOKEN: githubToken
} = process.env;


const octokit = new Octokit({
  auth: `token ${githubToken}`
});

async function main () {
  const stats = await request({
    uri: `https://hpb.health.gov.lk/api/get-current-statistical`,
    json: true
  })
 
  await updateGist(stats)
  console.log(stats);
}

async function updateGist(stats) {
  
  let gist;
  try {
    gist = await octokit.gists.get({ gist_id: gistId });
  } catch (error) {
    console.error(`Unable to get gist\n${error}`);
  }


  const lines = []

  lines.push([`😷 Stats for 2020-03-21 10:00:21`])

  const line1 = [
    '🌎 Global Cases'.padEnd(19),
    '275864'.padEnd(10),
    'Global Deaths'.padEnd(19),
    '275864'.padEnd(10)
  ];
  lines.push(line1.join(" "));

  const line2 = [
    'Global Cases'.padEnd(19),
    '275864'.padEnd(10),
    'Global Deaths'.padEnd(19),
    '275864'.padEnd(10)
  ];
  lines.push(line2.join(" "));

  const line3 = [
    '🇱🇰 Local Cases'.padEnd(19),
    '275864'.padEnd(10),
    'Global Deaths'.padEnd(19),
    '275864'.padEnd(10)
  ];
  lines.push(line3.join(" "));

  const line4 = [
    'Global Cases'.padEnd(19),
    '275864'.padEnd(10),
    'Global Deaths'.padEnd(19),
    '275864'.padEnd(10)
  ];
  lines.push(line4.join(" "));



  // Get original filename to update that same file
  const filename = Object.keys(gist.data.files)[0];

  try {
    await octokit.gists.update({
      gist_id: gistId,
      files: {
        [filename]: {
          filename: `😷 Latest Corona Stats`,
          content: lines.join("\n")
        }
      }
    });
  } catch (error) {
    console.error(`Unable to update gist\n${error}`);
  }
}

(async () => {
  await main();
})();
