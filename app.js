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

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    console.log("User : ");
    console.log(session.message.user);

    console.log("Adress");
    console.log(session.message.address);
    
    try{
	session.send("User name : " + session.message.user.name 
        + "<br> User id : "+ session.message.user.id 
        + "<br> Adress : "+ session.message.address.conversation.id);

    } catch(e){
	console.log('error when replying: '+e);
    }
});

