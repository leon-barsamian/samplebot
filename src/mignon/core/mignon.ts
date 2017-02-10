import { MignonStatus }  from "./mignonStatus";
import {UniversalBot}  from "botbuilder";

export interface Mignon {
    status: MignonStatus;
    create(bot: UniversalBot): void;
    getName(): string;
    getDescription(): string;
    execute(...optionalParams: any[]): void;
    
}