import { IConnection } from "../../common/Exports";
import { ConnectionFactoryBase } from "../ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig } from "../Exports";
/**
 * Create a connection to the Conversation Translator websocket for sending instant messages and commands, and for receiving translated messages.
 * The conversation must already have been started or joined.
 */
export declare class ConversationConnectionFactory extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
