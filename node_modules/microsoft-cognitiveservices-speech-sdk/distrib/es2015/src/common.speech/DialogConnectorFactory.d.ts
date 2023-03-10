import { IConnection } from "../common/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig } from "./Exports";
export declare class DialogConnectionFactory extends ConnectionFactoryBase {
    private static readonly ApiKey;
    private static readonly BaseUrl;
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
