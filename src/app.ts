import * as restify from "restify";
import * as builder from "botbuilder";
import {Butler} from "./minion/butler";



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
let intents = new builder.IntentDialog();

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

bot.dialog('/', intents);
new Butler(bot, intents);






