import { SpeechRecognitionResult } from "./Exports";
/**
 * Output format
 * @class AutoDetectSourceLanguageResult
 */
export declare class AutoDetectSourceLanguageResult {
    private privLanguage;
    private privLanguageDetectionConfidence;
    private constructor();
    /**
     * Creates an instance of AutoDetectSourceLanguageResult object from a SpeechRecognitionResult instance.
     * @member AutoDetectSourceLanguageResult.fromResult
     * @function
     * @public
     * @param {SpeechRecognitionResult} result - The recognition result.
     * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
     */
    static fromResult(result: SpeechRecognitionResult): AutoDetectSourceLanguageResult;
    get language(): string;
    get languageDetectionConfidence(): string;
}
