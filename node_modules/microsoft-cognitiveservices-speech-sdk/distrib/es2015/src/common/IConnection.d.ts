import { ConnectionEvent } from "./ConnectionEvents";
import { ConnectionMessage } from "./ConnectionMessage";
import { ConnectionOpenResponse } from "./ConnectionOpenResponse";
import { EventSource } from "./EventSource";
export declare enum ConnectionState {
    None = 0,
    Connected = 1,
    Connecting = 2,
    Disconnected = 3
}
export interface IConnection {
    id: string;
    state(): ConnectionState;
    open(): Promise<ConnectionOpenResponse>;
    send(message: ConnectionMessage): Promise<void>;
    read(): Promise<ConnectionMessage>;
    events: EventSource<ConnectionEvent>;
    dispose(disposing?: string): Promise<void>;
}
