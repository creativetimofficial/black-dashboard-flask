import { PropertyCollection } from "../PropertyCollection";
import { ResultReason } from "../ResultReason";
import { TranslationRecognitionResult } from "../TranslationRecognitionResult";
import { Translations } from "../Translations";
export declare class ConversationTranslationResult extends TranslationRecognitionResult {
    private privId;
    private privOrigLang;
    constructor(participantId: string, translations: Translations, originalLanguage?: string, resultId?: string, reason?: ResultReason, text?: string, duration?: number, offset?: number, errorDetails?: string, json?: string, properties?: PropertyCollection);
    /**
     * The unique identifier for the participant this result is for.
     */
    get participantId(): string;
    /**
     * The original language this result was in.
     */
    get originalLang(): string;
}
