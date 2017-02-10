import { MignonStatus }  from "./mignonStatus";
import {UniversalBot}  from "botbuilder";

export interface Mignon {
    create(bot: UniversalBot): void;
    getName(): string;
    getDescription(): string;
    execute(...optionalParams: any[]): void;
    getStatus(): MignonStatus;
    
}