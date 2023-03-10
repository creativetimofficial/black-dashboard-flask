// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Contracts } from "./Contracts";
/**
 * Output format
 * @class AutoDetectSourceLanguageResult
 */
export class AutoDetectSourceLanguageResult {
    constructor(language, languageDetectionConfidence) {
        Contracts.throwIfNullOrUndefined(language, "language");
        Contracts.throwIfNullOrUndefined(languageDetectionConfidence, "languageDetectionConfidence");
        this.privLanguage = language;
        this.privLanguageDetectionConfidence = languageDetectionConfidence;
    }
    /**
     * Creates an instance of AutoDetectSourceLanguageResult object from a SpeechRecognitionResult instance.
     * @member AutoDetectSourceLanguageResult.fromResult
     * @function
     * @public
     * @param {SpeechRecognitionResult} result - The recognition result.
     * @returns {AutoDetectSourceLanguageResult} AutoDetectSourceLanguageResult object being created.
     */
    static fromResult(result) {
        return new AutoDetectSourceLanguageResult(result.language, result.languageDetectionConfidence);
    }
    get language() {
        return this.privLanguage;
    }
    get languageDetectionConfidence() {
        return this.privLanguageDetectionConfidence;
    }
}

//# sourceMappingURL=AutoDetectSourceLanguageResult.js.map
