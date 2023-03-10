"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechSynthesisEventArgs = void 0;
/**
 * Defines contents of speech synthesis events.
 * @class SpeechSynthesisEventArgs
 * Added in version 1.11.0
 */
var SpeechSynthesisEventArgs = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {SpeechSynthesisResult} result - The speech synthesis result.
     */
    function SpeechSynthesisEventArgs(result) {
        this.privResult = result;
    }
    Object.defineProperty(SpeechSynthesisEventArgs.prototype, "result", {
        /**
         * Specifies the synthesis result.
         * @member SpeechSynthesisEventArgs.prototype.result
         * @function
         * @public
         * @returns {SpeechSynthesisResult} the synthesis result.
         */
        get: function () {
            return this.privResult;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechSynthesisEventArgs;
}());
exports.SpeechSynthesisEventArgs = SpeechSynthesisEventArgs;

//# sourceMappingURL=SpeechSynthesisEventArgs.js.map
