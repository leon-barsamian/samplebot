import { Dialog, IDialogWaterfallStep, Prompts, ListStyle } from "botbuilder";
import { Minion, MinionStatus } from "../core/core";
import * as builder from "botbuilder";


export class DemoMinion implements Minion {

    status: MinionStatus;
    getName() { return "DemoConnector" }

    getDescription() { return "way to create custom connector" }

    execute(...optionalParams: any[]) {

    }


    getDialogPattern() {
        return /^demo$/i;
    }

    create(bot: builder.UniversalBot): void {
        bot.dialog('/demo', this.getDemoDialog());
        bot.dialog('/demo/ImbackPostback', this.getPostbackImbackDialog(this));

    }

    getDemoDialog(): Dialog | IDialogWaterfallStep[] | IDialogWaterfallStep {

        return [
            function (session) {
                //Prompts.choice(session, "Welcome in this demo connector. Please select you demo", ["imback","postback"], { listStyle: ListStyle.button });
                // Prompts.text(session, "redirecting to demo/2");
                session.beginDialog('/demo/ImbackPostback');
            },

            function (session, results, next) {
                Prompts.text(session, "End of demo.");
                session.endDialog();
            }
        ];
    }

    getPostbackImbackDialog(that: DemoMinion): Dialog | IDialogWaterfallStep[] | IDialogWaterfallStep {

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
                Prompts.text(session, "You select choice " + results.response.entity + " at index " + results.response.index);
                session.endDialog();
            }
        ];
    }

    getSampleCardActions(session: builder.Session): builder.CardAction[] {
        return [
            builder.CardAction.imBack(session, "myImbackMessage", "Imback"),
            builder.CardAction.postBack(session, "myPostbackMessage", "PostBack")
        ];
    }
}