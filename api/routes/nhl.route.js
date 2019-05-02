// nhl.route.js

const express = require('express');
const app = express();
const nhlRoutes = express.Router();

// Require nhl model in our routes module
// let nhl = require('../models/nhl');

// Defined store route
nhlRoutes.route('/add').post(function (req, res) {
  let nhl = new nhl(req.body);
  nhl.save()
    .then(nhl => {
      res.status(200).json({ 'nhl': 'nhl in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
nhlRoutes.route('/nhl').get(function (req, res) {
  nhl.find(function (err, nhls) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(nhls);
    }
  });
});

// Defined edit route
nhlRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  nhl.findById(id, function (err, nhl) {
    res.json(nhl);
  });
});

//  Defined update route
nhlRoutes.route('/update/:id').post(function (req, res) {
  nhl.findById(req.params.id, function (err, next, nhl) {
    if (!nhl)
      return next(new Error('Could not load Document'));
    else {
      nhl.nhl_url = req.body.nhl_url;
      nhl.nhl_name = req.body.nhl_name;
      nhl.nhl_description = req.body.nhl_description;

      nhl.save().then(nhl => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database.");
        });
    }
  });
});

// Defined delete | remove | destroy route
nhlRoutes.route('/delete/:id').get(function (req, res) {
  nhl.findByIdAndRemove({ _id: req.params.id }, function (err, nhl) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = nhlRoutes;