//var restify = require('restify');
//var builder = require('botbuilder');

import * as restify from "restify";
// const {restify} = require('restify');
import * as builder from "botbuilder";

import { DemoConnector } from "./connectors/demoConnector/demoConnector"



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



/*bot.dialog('/', [
    function (session) {
        
        var arrayDebug = [session.message.user.id,
        session.message.user.name,
        session.message.address.channelId,
        //session.message.address.id,
        session.message.address.conversation.id
        ];
        builder.Prompts.text(session, "conversation id : "+session.message.address.conversation.id);
        let card = createHeroCard(session);
         var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.list)
            .attachments([card]);

        session.send(msg);
    }
]);*/

let demoConnector: DemoConnector = new DemoConnector();

/*bot.dialog('/', new builder.IntentDialog()
    .matches(demoConnector.getDialogId(), demoConnector.getDialog())
    .onDefault(function (session) {
        builder.Prompts.text(session, "conversation id : "+session.message.address.conversation.id);
        let card = createHeroCard(session);
         var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.list)
            .attachments([card]);

        session.send(msg);
    }));*/

bot.dialog('/', new builder.IntentDialog()
    .matches(demoConnector.getDialogPattern(), demoConnector.getDialog())
    .onDefault(function (session) {
        session.send("I didn't understand. Say hello to me!");
    }));


function createHeroCard(session: builder.Session): builder.HeroCard {
    return new builder.HeroCard(session)
        .title('BotFramework Hero Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        //.images(getSampleCardImages(session))
        .buttons(getSampleCardActions(session));
}

function getSampleCardImages(session: builder.Session): builder.CardImage[] {
    return [
        builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
    ];
}

function getSampleCardActions(session: builder.Session): builder.CardAction[] {
    return [
        builder.CardAction.imBack(session, "Plop Imback message", "imback title"),
        builder.CardAction.postBack(session, "postBack message", "postBack title")
    ];
}
