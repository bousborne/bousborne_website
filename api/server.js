// server.js
// require('rootpath')();
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');
  cron = require("node-cron");

const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const updateIP = require('./_helpers/updateIP');

const imageRoute = require('./routes/image.route');
const webcamRoute = require('./routes/webcam.route');
const nhlRoute = require('./routes/nhl.route');
const emailRoute = require('./routes/email.route');
let logRoute = require('./routes/log.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { logRoute.log('Database is connected') },
  err => { logRoute.log('Can not connect to the database' + err) }
);

const app = express();



// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '100MB' }));
app.use(bodyParser.urlencoded({ limit: '100MB', extended: true }));
// cors({ credentials: true, origin: true })

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200/nhl');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

app.use(cors({ credentials: true, origin: true }));
app.use('/gallery/image', imageRoute);
app.use('/snow/webcam', webcamRoute);
app.use('/nhl', nhlRoute);
app.use('/gallery/image', emailRoute);
app.use('/api', logRoute)


// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

const webcamStartupDB = require('./webcamStartupDB');
let cams = webcamStartupDB.cams();
let Webcam = require('./models/Webcam');

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

cams.forEach((item) => {
  Webcam.find(item, function(err, data){
    if(err){
        console.log(err);
        return
    }
  
    if(data.length == 0) {
        logRoute.log("No record found. Inserting item: " + JSON.stringify(item))
        let webcamInsert = new Webcam(item)
        webcamInsert.save()
        return
    }
    logRoute.log("Record found. Not updating with item: " + JSON.stringify(item))
  })
});

updateIP();
// logToFile();

// logToFile();

logRoute.log("test message");
// logEntry.logToFileFromServer("test")

// const port = process.env.PORT || 4000;
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
  logRoute.log('Listening on port ' + JSON.stringify(port));
});
