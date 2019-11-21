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

var LogEntry = require('../models/LogEntry');

// Defined store route
logRoutes.route('/log').post(function (req, res) {

  console.log("loggin! on snap we here in post");
  // debugger;
  let logEntry = new LogEntry(req.body);

  console.log("logEntry: ", logEntry)
  // console.log("req.body: ", req.body)
  // console.log("req, body.fileContent: ", req.body.fileContent)

  var fileData = logEntry.entryDate + " - " + "Type: " + logEntry.level + " - Message: " + logEntry.message + "\n";

  fs.appendFile('log.txt', fileData, function(err) {
    if (err) {
      console.log("Failed to write file")
      //  res.status(500).jsonp({ error: 'Failed to write file' });
    }
    console.log("File write success");
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = logRoutes;