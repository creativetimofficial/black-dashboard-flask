export interface ISpeechKeyword {
    Status: string;
    Text: string;
    Offset: number;
    Duration: number;
}
export declare class SpeechKeyword implements ISpeechKeyword {
    private privSpeechKeyword;
    private constructor();
    static fromJSON(json: string): SpeechKeyword;
    get Status(): string;
    get Text(): string;
    get Offset(): number;
    get Duration(): number;
}
