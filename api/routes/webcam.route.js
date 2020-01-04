// webcam.route.js

const express = require('express');
const app = express();
const webcamRoutes = express.Router();

// Require Webcam model in our routes module
let Webcam = require('../models/Webcam');
let logRoute = require('../routes/log.route');

// Defined store route
webcamRoutes.route('/add').post(function (req, res) {
  let webcam = new Webcam(req.body);
  logRoute.log("WebcamRoute ('/add').post webcam: "+ JSON.stringify(webcam))
  webcam.save()
    .then(webcam => {
      logRoute.log("webcam in added successfully");
      res.status(200).json({ 'webcam': 'webcam in added successfully' });
    })
    .catch(err => {
      logRoute.log("Unable to save to database");
      res.status(400).send("Unable to save to database");
    });
});

// Defined get data(index or listing) route
webcamRoutes.route('/').get(function (req, res) {
  Webcam.find(function (err, webcams) {
    logRoute.log("WebcamRoute ('/').get webcam: " + JSON.stringify(webcams))
    if (err) {
      console.log(err);
    }
    else {
      res.json(webcams);
    }
  });
});

// Defined edit route
webcamRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Webcam.findById(id, function (err, webcam) {
    logRoute.log("WebcamRoute ('/edit/:id').get webcam: " + JSON.stringify(webcam));
    logRoute.log("WebcamRoute ('/edit/:id').get webcam id: " + JSON.stringify(id));
    res.json(webcam);
  });
});

//  Defined update route
webcamRoutes.put('/update/:id', function (req, rest) {
  Webcam.findById(req.params.id, function (e, data) {
    if (e) { res.send(e); }
    logRoute.log("WebcamRoute ('/edit/:id').get webcam url: ", data.webcam_url, 
      ". webcam name: ", data.webcam_name, ". webcam location tag: ", data.webcam_location_tag);
    data.webcam_url = req.body.webcam_url;
    data.webcam_name = req.body.webcam_name;
    data.webcam_location_tag = req.body.webcam_location_tag;

    data.save(function (err) {
      if (err) {
        res.send(err);
        res.json(data);
      }
    })
  })
})

// Defined delete | remove | destroy route
webcamRoutes.route('/delete/:id').get(function (req, res) {
  Webcam.findByIdAndRemove({ _id: req.params.id }, function (err, webcam) {
    if (err) res.json(err);
    else {
      logRoute.log("WebcamRoute ('/edit/:id').get webcam: successfully removed");
      res.json('Successfully removed');
    }
  });
});

module.exports = webcamRoutes;