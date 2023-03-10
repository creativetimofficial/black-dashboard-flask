// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
import { TranslationRecognitionResult } from "../TranslationRecognitionResult";
export class ConversationTranslationResult extends TranslationRecognitionResult {
    constructor(participantId, translations, originalLanguage, resultId, reason, text, duration, offset, errorDetails, json, properties) {
        super(translations, resultId, reason, text, duration, offset, errorDetails, json, properties);
        this.privId = participantId;
        this.privOrigLang = originalLanguage;
    }
    /**
     * The unique identifier for the participant this result is for.
     */
    get participantId() {
        return this.privId;
    }
    /**
     * The original language this result was in.
     */
    get originalLang() {
        return this.privOrigLang;
    }
}

//# sourceMappingURL=ConversationTranslationResult.js.map
