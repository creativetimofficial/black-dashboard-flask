import { IPrimaryLanguage } from "./SimpleSpeechPhrase";
export interface ISpeechHypothesis {
    Text: string;
    Offset: number;
    Duration: number;
    PrimaryLanguage?: IPrimaryLanguage;
    SpeakerId?: string;
}
export declare class SpeechHypothesis implements ISpeechHypothesis {
    private privSpeechHypothesis;
    private constructor();
    static fromJSON(json: string): SpeechHypothesis;
    get Text(): string;
    get Offset(): number;
    get Duration(): number;
    get Language(): string;
    get LanguageDetectionConfidence(): string;
    get SpeakerId(): string;
}
