// Image.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let LogEntry = new mongoose.Schema({
  entryDate: { type: Date, default: Date.now },
  message: { type: String, required: true },
  level: { type: String, required: false},
  extraInfo: { type: String, required: false },
  logWithDate: { type: Boolean, default: true }
});

module.exports = mongoose.model('LogEntry', LogEntry);