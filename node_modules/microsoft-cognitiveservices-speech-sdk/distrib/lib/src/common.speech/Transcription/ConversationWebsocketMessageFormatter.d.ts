import { ConnectionMessage, IWebsocketMessageFormatter, RawWebsocketMessage } from "../../common/Exports";
import { ConversationConnectionMessage } from "./ConversationConnectionMessage";
/**
 * Based off WebsocketMessageFormatter. The messages for Conversation Translator have some variations from the Speech messages.
 */
export declare class ConversationWebsocketMessageFormatter implements IWebsocketMessageFormatter {
    /**
     * Format incoming messages: text (speech partial/final, IM) or binary (tts)
     */
    toConnectionMessage(message: RawWebsocketMessage): Promise<ConversationConnectionMessage>;
    /**
     * Format outgoing messages: text (commands or IM)
     */
    fromConnectionMessage(message: ConnectionMessage): Promise<RawWebsocketMessage>;
}
