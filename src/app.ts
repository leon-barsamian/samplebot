import * as restify from "restify";
import * as builder from "botbuilder";
import { DemoMignon } from "./mignon/demoMignon/demoMignon"



//=========================================================
// Bot Setup
//=========================================================
// declare var process: any;
// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
let bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


server.post('/api/notify', function (req, res) {
    // Process posted notification
    var address = JSON.parse(req.body.address);
    var notification = req.body.notification;

    // Send notification as a proactive message
    var msg = new builder.Message()
        .address(address)
        .text(notification);
    bot.send(msg, function (err) {
        // Return success/failure
        res.status(err ? 500 : 200);
        res.end();
    });
});

//=========================================================
// Bots Dialogs
//=========================================================


let demoMignon: DemoMignon = new DemoMignon();


bot.dialog('/', [function (session) {
    session.beginDialog('/demo');
},
function (session, results) {
    session.send('Bye.');
}]);



demoMignon.create(bot);
