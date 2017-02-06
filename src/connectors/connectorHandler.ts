import {Dialog, IDialogWaterfallStep}  from "botbuilder";

export interface IConnector {
    getName(): string;
    getDescription(): String;
    execute(...optionalParams: any[]): void;
    getStatus(): ConnectorStatus;
    getDialogPattern(): RegExp;
    getDialog(): string|IDialogWaterfallStep[]|IDialogWaterfallStep;
}

export class ConnectorStatus {
    lastStartDate: Date;
    lastExecutionStatus: string;
    isRunning: Boolean;
}

export class ConnectorHandler {

    static connectors: IConnector[];

    //get available connectors : return a list of available connectors

    // getActiveConnectors : return a list of active connectors. 
    // active connectors are either :
    //      - scheduled connectors 
    //      - running connectors (ie if execute function take times)
    // return a bot message (card ?) filled with ConnectorStatus information.
}