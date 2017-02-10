"use strict";
const botbuilder_1 = require("botbuilder");
const builder = require("botbuilder");
class DemoMignon {
    getName() { return "DemoConnector"; }
    getDescription() { return "way to create custom connector"; }
    execute(...optionalParams) {
    }
    getStatus() {
        return this.status;
    }
    getDialogPattern() {
        return /^demo$/i;
    }
    create(bot) {
        bot.dialog('/demo', this.getDemoDialog());
        bot.dialog('/demo/ImbackPostback', this.getPostbackImbackDialog(this));
    }
    getDemoDialog() {
        return [
            function (session) {
                //Prompts.choice(session, "Welcome in this demo connector. Please select you demo", ["imback","postback"], { listStyle: ListStyle.button });
                // Prompts.text(session, "redirecting to demo/2");
                session.beginDialog('/demo/ImbackPostback');
            },
            function (session, results, next) {
                botbuilder_1.Prompts.text(session, "End of demo.");
                session.endDialog();
            }
        ];
    }
    getPostbackImbackDialog(that) {
        return [
            function (session) {
                let card = new builder.HeroCard(session)
                    .title('Demo card action')
                    .subtitle('Imback and Postback test')
                    .text('')
                    .buttons(that.getSampleCardActions(session));
                var msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.list)
                    .attachments([card]);
                builder.Prompts.choice(session, msg, "myImbackMessage|myPostbackMessage");
            },
            function (session, results, next) {
                botbuilder_1.Prompts.text(session, "You select choice " + results.response.entity + " at index " + results.response.index);
                session.endDialog();
            }
        ];
    }
    getSampleCardActions(session) {
        return [
            builder.CardAction.imBack(session, "myImbackMessage", "Imback"),
            builder.CardAction.postBack(session, "myPostbackMessage", "PostBack")
        ];
    }
}
exports.DemoMignon = DemoMignon;
//# sourceMappingURL=demoMignon.js.map