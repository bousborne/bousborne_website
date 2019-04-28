// DB.js
const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;
// import { environment } from '../../environments/environment';

module.exports = {
    // DB: 'mongodb://localhost:27017/benousbornecom',
    DB: config.connectionString,
    User: require('./models/User')
};