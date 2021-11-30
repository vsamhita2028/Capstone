const express = require('express');
const authRouter = express.Router();
const { google } = require('googleapis');
const queryString = require('query-string');
const User = require("../Models/User")
const googleConfig = {
    clientId: "1077873291537-oqt6si3iuad9q3otn34t5h6c3jhtghea.apps.googleusercontent.com",
    clientSecret: "TRGHbrEpwXhudzREtzzZs78B",
    redirect: "http://localhost:3000/authRedirect"
};

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly',
    "https://www.googleapis.com/auth/gmail.settings.basic"
];

function getGoogleAccountFromCode(code) {
    const client = new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
    return new Promise((resolve, reject) => {
        client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating :(')
                reject(err);
                return null;
            } else {
                console.log('Successfully authenticated');
                resolve(tokens);
            }
        })
    })

}

function getProfileDetails(token) {
    const client = new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
    client.setCredentials(token);
    const gmail = google.gmail({ version: 'v1', auth: client });

    return new Promise((resolve, reject) => {
        gmail.users.getProfile({
            auth: client,
            userId: 'me'
        }, function (err, res) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(res);
                resolve(res);
            }
        });
    })
}

authRouter.route("/getUrl")
    .get((req, res) => {
        const conn = new google.auth.OAuth2(
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirect
        );
        const urls = conn.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: defaultScope
        });
        res.send({ url: urls });
    })

authRouter.route("/getToken")
    .post(async (req, res) => {
        const parsed = queryString.parse(req.body.url);
        // console.log(parsed['http://localhost:3000/dashboard?code']);
        // console.log(";")
        const token = await getGoogleAccountFromCode(parsed['http://localhost:3000/authRedirect?code']);
        const profile = await getProfileDetails(token)
        User.countDocuments({ email: profile.data.emailAddress }, (err, count) => {
            if (err) {
                console.log(err);
            } else {
                if (count === 0) {
                    const userProfile = new User({ email: profile.data.emailAddress });
                    userProfile.save();
                }
            }
        });
        res.send({ "token": token, "profile": profile })
    })

module.exports = authRouter;