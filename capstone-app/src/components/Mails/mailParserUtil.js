// const val = Base64.decode(result.data.msg[0].data.payload.parts[0].body.data)
//             setMailData(val);
//             console.log(val);
{/* <div className="content" dangerouslySetInnerHTML={{ __html: mailData }}></div> */ }
{/* {mailData.map((elem, idx) => (
                <div key={idx} className="mb-3">
                    {elem.data.snippet}
                </div>
            ))} */}
var base64 = require('js-base64').Base64;
const cheerio = require('cheerio');
var Mailparser = require('mailparser').MailParser;
const parseMails = (body) => {

    var htmlBody = base64.decode(body.replace(/-/g, '+').replace(/_/g, '/'));
    console.log(htmlBody)
    var mailparser = new Mailparser({ debug: true });

    mailparser.on("end", (err, res) => {
        console.log("res", res);
    })

    mailparser.on('data', (dat) => {
        if (dat.type === 'text') {
            const $ = cheerio.load(dat.textAsHtml);
            var links = [];
            var modLinks = [];
            $('a').each(function (i) {
                links[i] = $(this).attr('href');
            });

            //Regular Expression to filter out an array of urls.
            var pat = /------[0-9]-[0-9][0-9]/;

            //A new array modLinks is created which stores the urls.
            modLinks = links.filter(li => {
                if (li.match(pat) !== null) {
                    return true;
                }
                else {
                    return false;
                }
            });
            console.log(modLinks);

            //This function is called to open all links in the array.

        }
    })

    mailparser.write(htmlBody);
    mailparser.end();

}

module.exports = parseMails;