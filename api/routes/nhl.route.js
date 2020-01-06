// nhl.route.js

const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const app = express();
const nhlRoutes = express.Router();
var cors = require('cors');

// Require nhl model in our routes module
// let nhl = require('../models/nhl');

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

// Defined store route
nhlRoutes.route('/nhlpost').post(function (req, res) {
  var datatop = {}

  let nhlUrl = req.body;
  console.log("on snap we here");
  debugger
  console.log("In nhl node service. req = ", req.body);
  console.log("In nhl node service. nhlUrl = ", nhlUrl);
  const server = 'https://statsapi.web.nhl.com/api/v1/people/8471214.json';

  buf = new Buffer(256);
  path = 'ovipath.json';
  const downloadFile = (async (url, path) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", (err) => {
        reject(err);
      });
      fileStream.on("finish", function () {
        return resolve();
      });
    });
  });
  return downloadFile(server, path);
});

// Defined get data(index or listing) route
nhlRoutes.route('/nhlget').get(function (req, res) {
  nhlurl = 'https://statsapi.web.nhl.com/api/v1/people/8471214';
  const server = 'https://statsapi.web.nhl.com/api/v1/people/8471214.json';

  console.log("actually getting nhl");
  fetch(server)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    });
});

module.exports = nhlRoutes;