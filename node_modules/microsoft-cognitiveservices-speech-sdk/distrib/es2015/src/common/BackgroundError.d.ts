import { PlatformEvent } from "./Exports";
export declare class BackgroundEvent extends PlatformEvent {
    private privError;
    constructor(error: string);
    get error(): string;
}
