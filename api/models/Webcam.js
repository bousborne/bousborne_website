// Webcam.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Webcam
let Webcam = new mongoose.Schema({
  webcam_url: {
    type: String
  },
  webcam_name: {
    type: String
  },
  webcam_location_tag: {
    type: String
  },
  updated_at: { type: Date, default: Date.now }
}, {
    collection: 'webcam'
  });

module.exports = mongoose.model('Webcam', Webcam);