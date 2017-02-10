//var restify = require('restify');
//var builder = require('botbuilder');

import * as restify from "restify";
// const {restify} = require('restify');
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
