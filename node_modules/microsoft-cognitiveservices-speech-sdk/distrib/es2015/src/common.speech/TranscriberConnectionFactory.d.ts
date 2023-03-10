import { IConnection, IStringDictionary } from "../common/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig } from "./Exports";
export declare class TranscriberConnectionFactory extends ConnectionFactoryBase {
    private readonly multiaudioRelativeUri;
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
    setQueryParams(queryParams: IStringDictionary<string>, config: RecognizerConfig, endpointUrl: string): void;
}
