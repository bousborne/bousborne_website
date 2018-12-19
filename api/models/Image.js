// Image.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Image
let Image = new mongoose.Schema({
  file: { data: Buffer, contentType: String },
  image_url: {
    type: String
  },
  image_name: {
    type: String
  },
  image_description: {
    type: String
  },
  updated_at: { type: Date, default: Date.now }
}, {
    collection: 'image'
  });

module.exports = mongoose.model('Image', Image);