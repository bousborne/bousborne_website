// email.route.js

const express = require('express');
const app = express();
const emailRoutes = express.Router();
const emailConfig = require('../runtime-config').email;

emailRoutes.route('/emailpost').post(function (req, res) {
    if (!emailConfig.host || !emailConfig.user || !emailConfig.password) {
        return res.status(503).json({ error: 'Email is not configured' });
    }
    let sendEmailData = req.body;

    console.log("Made it into email post somehow!");
    console.log("About to email");
    var email = require('emailjs');
    var server = email.server.connect({
        user: emailConfig.user,
        password: emailConfig.password,
        host: emailConfig.host,
        ssl: emailConfig.ssl
    });

    server.send(sendEmailData, function (err, message) {
        if (err) {
            return res.status(502).json({ error: 'Email delivery failed' });
        }
        res.json({ sent: true });
    });
});
module.exports = emailRoutes;
