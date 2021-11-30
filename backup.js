const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var base64 = require('js-base64').Base64;
const cheerio = require('cheerio');
var open = require('open');
var Mailparser = require('mailparser').MailParser;
const express = require('express')
const app = express()
var cors = require('cors')
const queryString = require('query-string');

app.use(cors()); // to handle cross-origin errors
app.use(express.urlencoded({ extended: true })); // to make sure that we are able to access the request body.
app.use(express.json());
let oAuth2Client = null;

const googleConfig = {
    clientId: "1077873291537-oqt6si3iuad9q3otn34t5h6c3jhtghea.apps.googleusercontent.com", // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: "TRGHbrEpwXhudzREtzzZs78B", // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: "http://localhost:3000/dashboard" // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly',
    "https://www.googleapis.com/auth/gmail.settings.basic"
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
    oAuth2Client = createConnection(); // this is from previous step
    const url = getConnectionUrl(oAuth2Client);
    return url;
}


// -----------------------------------------------
// function getGooglePlusApi(auth) {
//   return google.plus({ version: 'v1', auth });
// }

/**
 * Extract the email and id of the google account from the "code" parameter.
 */
async function getGoogleAccountFromCode(code) {

    // get the auth "tokens" from the request
    oAuth2Client.getToken(code, function (err, tokens) {
        if (err) {
            console.log('Error authenticating')
            console.log(err);
            return null;
        } else {
            console.log(tokens);
            console.log('Successfully authenticated');
            oAuth2Client.setCredentials(tokens);
            clobj = oAuth2Client;
            console.log("-------------------------------------------")
            console.log(oAuth2Client)
            const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
            gmail.users.labels.list({
                userId: 'me',
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const labels = res.data.labels;
                if (labels.length) {
                    console.log('Labels:');
                    labels.forEach((label) => {
                        console.log(`- ${label.name}`);
                    });
                } else {
                    console.log('No labels found.');
                }
            })
        }
    })
}

// function getGooglePlusApi(auth) {
//   return google.plus({ version: 'v1', auth });
// }
// function getLabels(){
//   const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
//         gmail.users.labels.list({
//             userId: 'me',
//         }, (err, res) => {
//             if (err) return console.log('The API returned an error: ' + err);
//             const labels = res.data.labels;
//             if (labels.length) {
//                 console.log('Labels:');
//                 labels.forEach((label) => {
//                     console.log(`- ${label.name}`);
//                 });
//             } else {
//                 console.log('No labels found.');
//             }
//         });
// }

//---------------------------------------------------------------------

app.get('/login', function (req, res) {
    const urls = urlGoogle();
    res.send({ url: urls });
})
app.get('/', function (req, res) {
    res.send(("Login Sucesful"))
})

app.post("/auth", (req, res) => {
    const parsed = queryString.parse(req.body.url);
    console.log(parsed['http://localhost:3000/dashboard?code']);
    console.log(";")
    getGoogleAccountFromCode(parsed['http://localhost:3000/dashboard?code']);
    console.log("----------------------------------------------------------------------");
    console.log("----------------------------------------------------------------------");
    console.log("----------------------------------------------------------------------");
    console.log("----------------------------------------------------------------------");
    // console.log(obj);
    //getUserCredentials()
    //getLabels();
    // console.log(parsed);
    // console.log(req.body);
    res.send({ msg: "done" });
})
app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})

// const labels = res.data.labels;
            // if (labels.length) {
            //     console.log('Labels:');
            //     labels.forEach((label) => {
            //         console.log(`- ${label.name}`);
            //     });
            //     var data = {
            //       "criteria": {
            //         "from": "thisisdenny1234@gmail.com",
            //       },
            //       "action": {
            //         "removeLabelIds": [
            //           "INBOX",
            //         ],
            //       },
            //     };  
            // } else {
            //     console.log('No labels found.');
            // }

// const plus = getGooglePlusApi(oAuth2Client);
        // plus.people.get({ userId: 'me' },(err,me)=>{
        //   if (err) return console.log('The API returned an error: ' + err);
        //   else{
        //     console.log(me.data.id);
        //     console.log(me.data.emails && me.data.emails.length && me.data.emails[0].value);
        //   }
        // });
      //   gmail.users.getProfile({
      //     auth: oAuth2Client,
      //     userId: 'me'
      //     }, function(err, res) {
      //     if (err) {
      //         console.log(err);
      //     } else {
      //         console.log(res);
      //     }
      // });

      // gmail.users.settings.filters.create({
      //   auth: oAuth2Client,
      //   userId: 'me',
      //   resource: data,
      // }, function(err, result) {
      //   if (err) {
      //     console.log( err);
      //   } else {
      //     console.log( result );
      //   }
      // });
