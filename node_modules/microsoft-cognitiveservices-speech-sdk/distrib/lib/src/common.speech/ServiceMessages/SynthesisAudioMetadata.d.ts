import { SpeechSynthesisBoundaryType } from "../../sdk/Exports";
export declare enum MetadataType {
    WordBoundary = "WordBoundary",
    Bookmark = "Bookmark",
    Viseme = "Viseme",
    SentenceBoundary = "SentenceBoundary",
    SessionEnd = "SessionEnd"
}
export interface ISynthesisMetadata {
    Type: MetadataType;
    Data: {
        Offset: number;
        Duration: number;
        text: {
            Text: string;
            Length: number;
            BoundaryType: SpeechSynthesisBoundaryType;
        };
        Bookmark: string;
        VisemeId: number;
        AnimationChunk: string;
        IsLastAnimation: boolean;
    };
}
export interface ISynthesisAudioMetadata {
    Metadata: ISynthesisMetadata[];
}
export declare class SynthesisAudioMetadata implements ISynthesisAudioMetadata {
    private privSynthesisAudioMetadata;
    private constructor();
    static fromJSON(json: string): SynthesisAudioMetadata;
    get Metadata(): ISynthesisMetadata[];
}
