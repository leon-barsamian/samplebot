import { MinionStatus }  from "./minionStatus";
import {UniversalBot}  from "botbuilder";

export interface Minion {
    status: MinionStatus;
    create(bot: UniversalBot): void;
    getName(): string;
    getDescription(): string;
    execute(...optionalParams: any[]): void;
    
}