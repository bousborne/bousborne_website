// webcam.route.js

const express = require('express');
const app = express();
const webcamRoutes = express.Router();

// Require Webcam model in our routes module
let Webcam = require('../models/Webcam');

// Defined store route
webcamRoutes.route('/add').post(function (req, res) {
  let webcam = new Webcam(req.body);
  console.log("webcam", webcam)
  webcam.save()
    .then(webcam => {
      res.status(200).json({'webcam': 'webcam in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
webcamRoutes.route('/').get(function (req, res) {
    Webcam.find(function (err, webcams){
    if(err){
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
  Webcam.findById(id, function (err, webcam){
      res.json(webcam);
  });
});

//  Defined update route
webcamRoutes.route('/update/:id').post(function (req, res) {
    Webcam.findById(req.params.id, function(err, next, webcam) {
    if (!webcam)
      return next(new Error('Could not load Document'));
    else {
        webcam.webcam_url = req.body.webcam_url;
        webcam.webcam_name = req.body.webcam_name;
        webam.webcam_location_tag = req.body.webcam_location_tag;

        webcam.save().then(webcam => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
webcamRoutes.route('/delete/:id').get(function (req, res) {
    Webcam.findByIdAndRemove({_id: req.params.id}, function(err, webcam){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = webcamRoutes;