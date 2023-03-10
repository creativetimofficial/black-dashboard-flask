import { PropertyCollection } from "../sdk/Exports";
import { SpeechServiceConfig } from "./Exports";
export declare enum SynthesisServiceType {
    Standard = 0,
    Custom = 1
}
export declare class SynthesizerConfig {
    private privSynthesisServiceType;
    private privSpeechServiceConfig;
    private privParameters;
    constructor(speechServiceConfig: SpeechServiceConfig, parameters: PropertyCollection);
    get parameters(): PropertyCollection;
    get synthesisServiceType(): SynthesisServiceType;
    set synthesisServiceType(value: SynthesisServiceType);
    get SpeechServiceConfig(): SpeechServiceConfig;
}
