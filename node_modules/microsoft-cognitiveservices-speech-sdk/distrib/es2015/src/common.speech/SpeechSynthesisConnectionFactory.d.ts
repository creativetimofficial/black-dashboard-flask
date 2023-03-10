import { IConnection } from "../common/Exports";
import { AuthInfo, SynthesizerConfig } from "./Exports";
import { ISynthesisConnectionFactory } from "./ISynthesisConnectionFactory";
export declare class SpeechSynthesisConnectionFactory implements ISynthesisConnectionFactory {
    private readonly synthesisUri;
    create(config: SynthesizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
