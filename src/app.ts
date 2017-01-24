//var restify = require('restify');
//var builder = require('botbuilder');

import * as restify from "restify";
// const {restify} = require('restify');
import * as builder from "botbuilder";



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
//module.exports = { default: connector.listen() }

//=========================================================
// Bots Dialogs
//=========================================================



bot.dialog('/', [
    function (session) {
        
        var arrayDebug = [session.message.user.id,
        session.message.user.name,
        session.message.address.channelId,
        //session.message.address.id,
        session.message.address.conversation.id
        ];
        builder.Prompts.text(session, "conversation id : "+session.message.address.conversation.id);
    }
]);
