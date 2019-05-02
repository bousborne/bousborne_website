// email.route.js

const express = require('express');
const app = express();
const emailRoutes = express.Router();
const emailConfig = require('../emailConfig.json');

emailRoutes.route('/emailpost').post(function (req, res) {
    let sendEmailData = req.body;

    console.log("Made it into email post somehow!");
    console.log("About to email");
    console.log("Node Server Email Post, sendEmailData = ", sendEmailData);

    var email = require('../node_modules/emailjs');
    var server = email.server.connect({
        user: emailConfig.user,
        password: emailConfig.password,
        host: emailConfig.host,
        ssl: true
    }, function (err, message) {
        console.log(err || message);
    });

    server.send(sendEmailData, function (err, message) {
        console.log(err || message);
    });
});
module.exports = emailRoutes;