import {Prompts} from 'botbuilder/lib/botbuilder';
import {NetatmoMignon} from './mignon/netatmoMignon/netatmoMignon';
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


let demoMignon: DemoMignon = new DemoMignon();
let meteoMignon: NetatmoMignon = new NetatmoMignon();


bot.dialog('/', intents);

intents.matches(/^demo$/i, function (session) {
    session.beginDialog("/demo");
});

intents.matches(/^meteo$/i, function (session) {
    session.beginDialog("/meteo");
});

intents.onDefault([
    function (session, args, next) {
        session.send("\\o/");
    }
]);

demoMignon.create(bot);
meteoMignon.create(bot);