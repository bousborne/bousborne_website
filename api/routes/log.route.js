// nhl.route.js

const express = require('express');
const fetch = require('node-fetch');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
var http = require('http');
var cors = require('cors');
const logRoutes = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cors());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });
 
var LogEntry = require('../models/LogEntry');

const LogLevel = {
  All: 'LOG',
  Debug: 'DEBUG',
  Info: 'INFO',
  Warn: 'WARN',
  Error: 'ERROR',
  Fatal: 'FATAL',
  Off: 'OFF'
}



// Defined store route
logRoutes.route('/log').post(function (req, res) {
  console.log("Log.route post Response: ", res)
  let logEntry = req.body;
  logToFile(logEntry);
});

function logToFile(logEntry) {
  var fileData = logEntry.entryStringObj + "\n";

  console.log("Writing message to log file: " + fileData);

  fs.appendFile('log.txt', fileData, function(err) {
    if (err) {
      console.log("Failed to write file")
      //  res.status(500).jsonp({ error: 'Failed to write file' });
    }
    console.log("File write success");
  });
}

logRoutes.log = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.Log);
};

logRoutes.debug = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.Debug);
}

logRoutes.info = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.Info);
}

logRoutes.warn = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.Warn);
}

logRoutes.error = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.Error);
}

logRoutes.fatal = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.Fatal);
}

logRoutes.log = function (logEntry) {
  logToFileFromServer(logEntry, LogLevel.All);
}

function logToFileFromServer(logEntry, logLevel) {
  var date = new Date();
  var fileData = date + ": [SERVER " + logLevel + "] - Message: " + logEntry + "\n";

  console.log("Writing message to log file: " + fileData);
  fs.appendFile('log.txt', fileData, function (err) {
    if (err) {
      console.log("Failed to write to log file")
      //  res.status(500).jsonp({ error: 'Failed to write file' });
    }
    console.log("File write to log success");
  });
};

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Log.route Error Handler Response: ", res.body)
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = logRoutes;