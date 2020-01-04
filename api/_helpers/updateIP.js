cron = require("node-cron");
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
6 * * * would run every 6 hours
*/
console.log("In cron job");

cron.schedule("* 4 * * * *", function() {
  var date = new Date();
  console.log(date + " running a runIP() task every 30 seconds");
  runIP();
  console.log(date + " returned from runIP()");
  
});

}

function runIP() {
  console.log("In runIP");
  const { spawn } = require('child_process')
  spawn('sh', ['./godaddy.sh'])
}
// function runIP(error, stdout, stderr) { sys.puts(stdout) }
// exec("./godaddy", function(error, stdout, stderr) {
//   if (!error) {
//     // things worked!
//   } else {
//     // things failed :(
//   }
// });