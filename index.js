require("dotenv").config();
const Octokit = require("@octokit/rest");
const request = require('request-promise');

const {
  GIST_ID: gistId,
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
}

async function updateGist(stats) {

  let gist;
  try {
    gist = await octokit.gists.get({ gist_id: gistId });
  } catch (error) {
    console.error(`Unable to get gist\n${error}`);
  }

  const lines = []

  lines.push([`🦠 Stats for `+ stats.data.update_date_time])

  const line1 = [
    '🌎 Global Cases:'.padEnd(19),
    String(stats.data.global_total_cases).padEnd(10),
    '💀 Global Deaths:'.padEnd(23),
    String(stats.data.global_deaths).padEnd(10)
  ];
  lines.push(line1.join(" "));

  const line2 = [
    '🇱🇰 Local Cases:'.padEnd(21),
    String(stats.data.local_total_cases).padEnd(10),
    '🇱🇰 Local Hospitalized:'.padEnd(25),
    String(stats.data.local_total_number_of_individuals_in_hospitals).padEnd(10)
  ];
  lines.push(line2.join(" "));


  let globalrec = Math.floor((stats.data.global_recovered/stats.data.global_total_cases)*100);
  const line3 = [
    "🌎 Global Recovery: ".padEnd(19),
    generateBarChart(globalrec, 20),
    String(globalrec+"%").padEnd(10)
  ];
  lines.push(line3.join(" "));

  let localrec = Math.floor((stats.data.local_recovered/stats.data.local_total_cases)*100);
  const line4 = [
    "🇱🇰 Local Recovery: ".padEnd(22),
    generateBarChart(localrec, 20),
    String(localrec+"%").padEnd(10)
  ];
  lines.push(line4.join(" "));


  function generateBarChart(percent, size) {
    const syms = "░▏▎▍▌▋▊▉█";
  
    const frac = (size * 8 * percent) / 100;
    const barsFull = Math.floor(frac / 8);
    const semi = frac % 8;
    const barsEmpty = percent === 100 ? 0 : size - barsFull - 1;
  
    return [
      syms.substring(8, 9).repeat(barsFull),
      syms.substring(semi, semi + 1),
      syms.substring(0, 1).repeat(barsEmpty)
    ].join("");
  }

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
