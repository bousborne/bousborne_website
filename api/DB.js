// DB.js
const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    DB: 'mongodb://localhost:27017/benousbornecom',
    User: require('./models/User')
};