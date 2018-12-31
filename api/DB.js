// DB.js
const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;
// import { environment } from '../../environments/environment';

module.exports = {
    // uri = 'mongodb://' + environment.apiUrlRoot + '/benousbornecom';

    DB: 'mongodb://localhost:27017/benousbornecom',
    User: require('./models/User')
};