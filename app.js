var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//module.exports = { default: connector.listen() }

function logSessionInfo(session) {
    console.log("User : ");
    console.log(session.message.user);
    console.log("Adress");
    console.log(session.message.address);
}
//=========================================================
// Bots Dialogs
//=========================================================



bot.dialog('/', [
    function (session) {
        logSessionInfo(session);
        var arrayDebug = [session.message.user.id,
        session.message.user.name,
        session.message.address.channelId,
        session.message.address.id,
        session.message.address.conversation.id
        ];
        builder.Prompts.choice(session, 'debug infos : ', arrayDebug, {
            maxRetries: 3,
            retryPrompt: 'Debug Done.'
        });
    }
]);
// Bot dialog
/*bot.dialog('/', [
    function (session) {
        logSessionInfo(session);
        builder.Prompts.choice(session, 'What card would like to test?', CardNames, {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
    }
    ,
    function (session, results) {

        // create the card based on selection
        var selectedCardName = results.response.entity;
        var card = createCard(selectedCardName, session);

        // attach the card to the reply message
        // var msg = new builder.Message(session).addAttachment(card);
        var card1 = createCard(selectedCardName, session);
        var card2 = createCard(selectedCardName, session);

        var msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([card, card1, card2]);

        session.send(msg);
    }
]);*/

const HeroCardName = 'Hero card';
const ThumbnailCardName = 'Thumbnail card';
const ReceiptCardName = 'Receipt card';
const SigninCardName = 'Sign-in card';
const CardNames = [HeroCardName, ThumbnailCardName, ReceiptCardName, SigninCardName];

function createCard(selectedCardName, session) {
    switch (selectedCardName) {
        case HeroCardName:
            return createHeroCard(session);
        case ThumbnailCardName:
            return createThumbnailCard(session);
        case ReceiptCardName:
            return createReceiptCard(session);
        case SigninCardName:
            return createSigninCard(session);
        default:
            return createHeroCard(session);
    }
}

function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('BotFramework Hero Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images(getSampleCardImages(session))
        .buttons(getSampleCardActions(session));
}

function createThumbnailCard(session) {
    return new builder.ThumbnailCard(session)
        .title('BotFramework Thumbnail Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images(getSampleCardImages(session))
        .buttons(getSampleCardActions(session));
}

var order = 1234;
function createReceiptCard(session) {
    return new builder.ReceiptCard(session)
        .title('John Doe')
        .facts([
            builder.Fact.create(session, order++, 'Order Number'),
            builder.Fact.create(session, 'VISA 5555-****', 'Payment Method'),
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 38.45', 'Data Transfer')
                .quantity(368)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
            builder.ReceiptItem.create(session, '$ 45.00', 'App Service')
                .quantity(720)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
        ])
        .tax('$ 7.50')
        .total('$ 90.95')
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'More Information')
                .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
        ]);
}

function createSigninCard(session) {
    return new builder.SigninCard(session)
        .text('BotFramework Sign-in Card')
        .button('Sign-in', 'https://login.microsoftonline.com')
}

function getSampleCardImages(session) {
    return [
        builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
    ];
}

function getSampleCardActions(session) {
    return [
        builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Get Started')
    ];
}

