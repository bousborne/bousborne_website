// image.route.js

const express = require('express');
const app = express();
const imageRoutes = express.Router();

// Require Image model in our routes module
let Image = require('../models/Image');

// Defined store route
imageRoutes.route('/add').post(function (req, res) {
  let image = new Image(req.body);
  image.save()
    .then(image => {
      res.status(200).json({ 'image': 'image in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
imageRoutes.route('/').get(function (req, res) {
  Image.find(function (err, images) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(images);
    }
  });
});

// Defined edit route
imageRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Image.findById(id, function (err, image) {
    res.json(image);
  });
});

//  Defined update route
imageRoutes.route('/update/:id').post(function (req, res) {
  Image.findById(req.params.id, function (err, next, image) {
    if (!image)
      return next(new Error('Could not load Document'));
    else {
      image.image_url = req.body.image_url;
      image.image_name = req.body.image_name;
      image.image_description = req.body.image_description;

      image.save().then(image => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database.");
        });
    }
  });
});

// Defined delete | remove | destroy route
imageRoutes.route('/delete/:id').get(function (req, res) {
  Image.findByIdAndRemove({ _id: req.params.id }, function (err, image) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = imageRoutes;