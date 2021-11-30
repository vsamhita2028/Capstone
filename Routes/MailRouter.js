const Mail = require("../Models/Mails");
const express = require('express');
const MailRouter = express.Router();
const { google } = require('googleapis');
const queryString = require('query-string');
var base64 = require('js-base64').Base64;
const cheerio = require('cheerio');
var Mailparser = require('mailparser').MailParser;

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

function listMessages(auth, query) {
    return new Promise((resolve, reject) => {
        const gmail = google.gmail({ version: 'v1', auth });
        gmail.users.messages.list(
            {
                userId: 'me',
                q: "from:" + query + " is:unread" + " !is:unread",
                maxResults: 5
            }, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!res.data.messages) {
                    resolve([]);
                    return;
                }
                resolve(res.data);
            }
        );
    })
}
async function getMail(msgId, auth) {
    let data = "meow";
    //console.log(msgId)
    return new Promise(async (resolve, reject) => {
        const gmail = google.gmail({ version: 'v1', auth });
        gmail.users.messages.get({
            userId: 'me',
            id: msgId,
        }, async (err, res) => {

            // let parsed = await parseMails(res.data.payload.parts[0].body.data);
            resolve(res);
        });
    })
}

function parseMails(body) {
    if (body) {
        var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
        var mailparser = new Mailparser({ debug: true });

        const val = mailparser.write(htmlBody);
        mailparser.end();
        return val
    }


}
MailRouter.route("/getCategories")
    .get((req, res) => {
        const param = req.query.user;
        Mail.aggregate([
            {
                $match: {
                    user: param
                }
            },
            {
                $group: {
                    _id: "$category",
                    from: {
                        $push: "$from"
                    }
                }
            },
            { $sort: { '_id': -1 } }
        ], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ result: result });
            }
        })
    })

MailRouter.route("/addCategory")
    .post((req, res) => {
        const data = req.body;
        const MailObj = new Mail(data)
        MailObj.save()
            .then((result) => {
                res.send({ msg: "done" });
            })

    })
MailRouter.route("/delete")
    .delete((req, res) => {
        const data = req.body;
        Mail.deleteMany(data, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ msg: "deleted" });
            }
        })

    })
MailRouter.route("/getMails")
    .get(async (req, res) => {
        const params = req.query.token;
        const client = new google.auth.OAuth2(
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirect
        );
        var gmail = google.gmail({
            auth: client,
            version: 'v1'
        });
        client.setCredentials(JSON.parse(params));
        let data = await listMessages(client, req.query.from);
        console.log(data);
        let data_again = []
        let flag = false;
        var itemsProcessed = 0;

        data.messages.forEach(async (item, index, array) => {
            data_again.push(await getMail(item.id, client));
            itemsProcessed++;
            if (itemsProcessed === array.length) {
                console.log("meow", data_again);
                res.send({ msg: data_again });
            }
        });
    })
module.exports = MailRouter;