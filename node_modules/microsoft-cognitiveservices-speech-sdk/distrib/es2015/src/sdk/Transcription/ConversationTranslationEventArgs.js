// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
import { RecognitionEventArgs } from "../Exports";
export class ConversationTranslationEventArgs extends RecognitionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {ConversationTranslationResult} result - The translation recognition result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(result, offset, sessionId) {
        super(offset, sessionId);
        this.privResult = result;
    }
    /**
     * Specifies the recognition result.
     * @returns {ConversationTranslationResult} the recognition result.
     */
    get result() {
        return this.privResult;
    }
}

//# sourceMappingURL=ConversationTranslationEventArgs.js.map
