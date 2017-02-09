import { Dialog, IDialogWaterfallStep, Prompts, ListStyle } from "botbuilder";
import { IConnector, ConnectorStatus } from "../connectorHandler"


export class DemoConnector implements IConnector {

    private status: ConnectorStatus;
    getName() { return "DemoConnector" }

    getDescription() { return "way to create custom connector" }

    execute(...optionalParams: any[]) {

    }

    getStatus() {
        return this.status;
    }

    getDialogPattern() {
        return /^demo$/i;
    }

    getDialog(): string | IDialogWaterfallStep[] | IDialogWaterfallStep {

        return [
            function (session) {
                //Prompts.choice(session, "Welcome in this demo connector. Please select you demo", ["imback","postback"], { listStyle: ListStyle.button });
                session.beginDialog('/demo/2');
                session.routeToActiveDialog
            },

            function (session, results, next) {
                Prompts.text(session, "You select choice "+results.response.entity +" at index " + results.response.index);
                session.endDialog();
            }
        ];
    }

    getDialog2(): string | IDialogWaterfallStep[] | IDialogWaterfallStep {

        return [
            function (session) {
                Prompts.choice(session, "Welcome2", ["imback2","postback2"], { listStyle: ListStyle.button });
            },

            function (session, results, next) {
                Prompts.text(session, "222You select choice "+results.response.entity +" at index " + results.response.index);
                session.endDialog();
            }
        ];
    }
}