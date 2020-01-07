cron = require("node-cron");
let logRoute = require('../routes/log.route');

// var exec = require('child_process').exec;

module.exports = updateIP;

function updateIP() {

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
  cron.schedule("* * 6 * * *", function () {
    var date = new Date();
    console.log("Running a runIP() task every 6 hours");
    runIP();
    logRoute.log("Completed updateIP() Cron Jon");

  });
}

function runIP() {
  const { spawn } = require('child_process')
  spawn('sh', ['./godaddy.sh'])
}
