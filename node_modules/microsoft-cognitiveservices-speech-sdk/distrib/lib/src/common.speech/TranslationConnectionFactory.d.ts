import { IConnection, IStringDictionary } from "../common/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig } from "./Exports";
export declare class TranslationConnectionFactory extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
    getEndpointUrl(config: RecognizerConfig, returnRegionPlaceholder?: boolean): string;
    setQueryParams(queryParams: IStringDictionary<string>, config: RecognizerConfig, endpointUrl: string): void;
}
