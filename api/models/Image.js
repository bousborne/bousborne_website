// Image.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Image
let Image = new Schema({
  image_url: {
    type: String
  },
  image_name: {
    type: String
  },
  image_description: {
    type: String
  }
},{
    collection: 'image'
});

module.exports = mongoose.model('Image', Image);