// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Defines contents of speech synthesis events.
 * @class SpeechSynthesisEventArgs
 * Added in version 1.11.0
 */
export class SpeechSynthesisEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {SpeechSynthesisResult} result - The speech synthesis result.
     */
    constructor(result) {
        this.privResult = result;
    }
    /**
     * Specifies the synthesis result.
     * @member SpeechSynthesisEventArgs.prototype.result
     * @function
     * @public
     * @returns {SpeechSynthesisResult} the synthesis result.
     */
    get result() {
        return this.privResult;
    }
}

//# sourceMappingURL=SpeechSynthesisEventArgs.js.map
