import { Dialog, IDialogWaterfallStep, Prompts, ListStyle } from "botbuilder";
import { Minion, MinionStatus } from "../core/core";
import * as builder from "botbuilder";
const netatmo = require('netatmo');


export class NetatmoMinion implements Minion {

    // api: any = new netatmo({
    //     "client_id": "",
    //     "client_secret": "",
    //     "username": "",
    //     "password": "",
    // });
    status: MinionStatus;

    getName() { return "DemoConnector" }

    getDescription() { return "way to create custom connector" }

    execute(...optionalParams: any[]) {

    }

    create(bot: builder.UniversalBot): void {
        // current weater
        // automatic send morning weather with node-schedule
        bot.dialog('/meteo', this.getDialog());

    }

    getDialog(): Dialog | IDialogWaterfallStep[] | IDialogWaterfallStep {
        return [
            function (session: builder.Session) {
                Prompts.text(session, "My meteo");
                session.endDialog();
            }
        ];
    }



}