// server.js
// require('rootpath')();
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./DB');

const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const imageRoute = require('./routes/image.route');
const webcamRoute = require('./routes/webcam.route');
const nhlRoute = require('./routes/nhl.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();

// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/gallery/image', imageRoute);
app.use('/snow/webcam', webcamRoute);
app.use('/snow/webcam', nhlRoute);


// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// const port = process.env.PORT || 4000;
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});