// DB.js
const config = require('./runtime-config');
// import { environment } from '../../environments/environment';

module.exports = {
    // DB: 'mongodb://localhost:27017/benousbornecom',
    DB: config.connectionString,
    User: require('./models/User')
};
