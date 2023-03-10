import { ConnectionMessage } from "./ConnectionMessage";
import { RawWebsocketMessage } from "./RawWebsocketMessage";
export interface IWebsocketMessageFormatter {
    toConnectionMessage(message: RawWebsocketMessage): Promise<ConnectionMessage>;
    fromConnectionMessage(message: ConnectionMessage): Promise<RawWebsocketMessage>;
}
