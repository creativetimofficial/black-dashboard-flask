import { IEventSource } from "./IEventSource";
import { PlatformEvent } from "./PlatformEvent";
export declare class Events {
    private static privInstance;
    static setEventSource(eventSource: IEventSource<PlatformEvent>): void;
    static get instance(): IEventSource<PlatformEvent>;
}
