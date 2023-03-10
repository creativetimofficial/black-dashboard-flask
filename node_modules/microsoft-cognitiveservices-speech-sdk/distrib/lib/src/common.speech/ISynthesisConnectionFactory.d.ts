import { IConnection } from "../common/Exports";
import { AuthInfo } from "./IAuthentication";
import { SynthesizerConfig } from "./SynthesizerConfig";
export interface ISynthesisConnectionFactory {
    create(config: SynthesizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
