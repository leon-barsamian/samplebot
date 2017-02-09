"use strict";
const botbuilder_1 = require("botbuilder");
class DemoConnector {
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
    getDialog() {
        return [
            function (session) {
                //Prompts.choice(session, "Welcome in this demo connector. Please select you demo", ["imback","postback"], { listStyle: ListStyle.button });
                session.beginDialog('/demo/2');
            },
            function (session, results, next) {
                botbuilder_1.Prompts.text(session, "You select choice " + results.response.entity + " at index " + results.response.index);
                session.endDialog();
            }
        ];
    }
    getDialog2() {
        return [
            function (session) {
                botbuilder_1.Prompts.choice(session, "Welcome2", ["imback2", "postback2"], { listStyle: botbuilder_1.ListStyle.button });
            },
            function (session, results, next) {
                botbuilder_1.Prompts.text(session, "222You select choice " + results.response.entity + " at index " + results.response.index);
                session.endDialog();
            }
        ];
    }
}
exports.DemoConnector = DemoConnector;
//# sourceMappingURL=demoConnector.js.map