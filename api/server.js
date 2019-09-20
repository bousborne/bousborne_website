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
const emailRoute = require('./routes/email.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();



// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({ limit: '100MB' }));
app.use(bodyParser.urlencoded({ limit: '100MB', extended: true }));
// cors({ credentials: true, origin: true })

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  next();
 });

app.use(cors({ credentials: true, origin: true }));
app.use('/gallery/image', imageRoute);
app.use('/snow/webcam', webcamRoute);
app.use('/nhl', nhlRoute);
app.use('/gallery/image', emailRoute);


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
        console.log("No record found. Inserting item: ", item)
        let webcamInsert = new Webcam(item)
        webcamInsert.save()
        return
    }
    console.log("Record found. Not updating with item: ", item)
  })
});

// const port = process.env.PORT || 4000;
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});