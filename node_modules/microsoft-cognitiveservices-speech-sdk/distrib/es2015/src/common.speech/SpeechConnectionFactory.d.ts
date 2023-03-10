import { IConnection } from "../common/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig } from "./Exports";
export declare class SpeechConnectionFactory extends ConnectionFactoryBase {
    private readonly interactiveRelativeUri;
    private readonly conversationRelativeUri;
    private readonly dictationRelativeUri;
    private readonly universalUri;
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
