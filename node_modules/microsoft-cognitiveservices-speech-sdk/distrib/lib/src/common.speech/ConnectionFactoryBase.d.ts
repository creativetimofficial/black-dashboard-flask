import { IConnection, IStringDictionary } from "../common/Exports";
import { PropertyId } from "../sdk/Exports";
import { AuthInfo, IConnectionFactory, RecognizerConfig } from "./Exports";
export declare abstract class ConnectionFactoryBase implements IConnectionFactory {
    static getHostSuffix(region: string): string;
    abstract create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
    protected setCommonUrlParams(config: RecognizerConfig, queryParams: IStringDictionary<string>, endpoint: string): void;
    protected setUrlParameter(propId: PropertyId, parameterName: string, config: RecognizerConfig, queryParams: IStringDictionary<string>, endpoint: string): void;
}
