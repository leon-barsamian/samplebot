interface IConnector {
    getName(): String;
    getDescription(): String;
    execute(...optionalParams: any[]): void;
    getStatus(): ConnectorStatus;
}

class ConnectorStatus {
    lastStartDate: Date;
    lastExecutionStatus: String;
    isRunning: Boolean;
}

class ConnectorHandler {

    static connectors: IConnector[];

    //get available connectors : return a list of available connectors

    // getActiveConnectors : return a list of active connectors. 
    // active connectors are either :
    //      - scheduled connectors 
    //      - running connectors (ie if execute function take times)
    // return a bot message (card ?) filled with ConnectorStatus information.
}