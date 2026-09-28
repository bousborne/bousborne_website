const cron = require("node-cron");
const fs = require('fs');
const path = require('path');
let logRoute = require('../routes/log.route');

// var exec = require('child_process').exec;

module.exports = updateIP;

function updateIP() {
  const script = path.join(__dirname, '..', 'godaddy.sh');
  if (!fs.existsSync(script)) {
    throw new Error('ENABLE_DDNS=true requires an explicitly mounted api/godaddy.sh');
  }

  /*
Cron job schedule works as the following:
* * * * * *
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second ( optional )

Example:
* 6 * * * would run every 6 hours
*/
  logRoute.log("Running updateIP() Cron Job");
  cron.schedule("0 */6 * * *", function () {
    var date = new Date();
    console.log("Running a runIP() task every 6 hours");
    runIP(script);
    logRoute.log("Completed updateIP() Cron Jon");

  });
}

function runIP(script) {
  const { spawn } = require('child_process')
  const child = spawn('bash', [script], { stdio: 'inherit' });
  child.on('error', err => logRoute.error('DNS updater failed: ' + err.message));
}
