// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SessionEventArgs } from "./Exports";
/**
 * Translation Synthesis event arguments
 * @class TranslationSynthesisEventArgs
 */
export class TranslationSynthesisEventArgs extends SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {TranslationSynthesisResult} result - The translation synthesis result.
     * @param {string} sessionId - The session id.
     */
    constructor(result, sessionId) {
        super(sessionId);
        this.privResult = result;
    }
    /**
     * Specifies the translation synthesis result.
     * @member TranslationSynthesisEventArgs.prototype.result
     * @function
     * @public
     * @returns {TranslationSynthesisResult} Specifies the translation synthesis result.
     */
    get result() {
        return this.privResult;
    }
}

//# sourceMappingURL=TranslationSynthesisEventArgs.js.map
