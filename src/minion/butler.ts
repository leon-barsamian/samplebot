import { Remember } from './core/remember';
import * as builder from "botbuilder";
import {DemoMinion} from "./demoMignon/demoMignon";
import {NetatmoMinion} from "./netatmoMignon/netatmoMignon";

export class Butler {

    private remember: Remember;

    constructor(bot: builder.UniversalBot, intents: builder.IntentDialog) {
        // Database connection
        this.remember = new Remember();

        let demoMignon: DemoMinion = new DemoMinion();
        let meteoMignon: NetatmoMinion = new NetatmoMinion();




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

    }


}