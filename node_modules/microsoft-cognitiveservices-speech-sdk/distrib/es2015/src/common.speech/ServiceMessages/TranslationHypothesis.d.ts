import { ITranslations } from "../Exports";
export interface ITranslationHypothesis {
    Duration: number;
    Offset: number;
    Text: string;
    Translation: ITranslations;
}
export declare class TranslationHypothesis implements ITranslationHypothesis {
    private privTranslationHypothesis;
    private constructor();
    static fromJSON(json: string): TranslationHypothesis;
    get Duration(): number;
    get Offset(): number;
    get Text(): string;
    get Translation(): ITranslations;
}
