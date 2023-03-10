import { SynthesisStatus } from "../Exports";
export interface ITranslationSynthesisEnd {
    SynthesisStatus: SynthesisStatus;
    FailureReason: string;
}
export declare class TranslationSynthesisEnd implements ITranslationSynthesisEnd {
    private privSynthesisEnd;
    private constructor();
    static fromJSON(json: string): TranslationSynthesisEnd;
    get SynthesisStatus(): SynthesisStatus;
    get FailureReason(): string;
}
