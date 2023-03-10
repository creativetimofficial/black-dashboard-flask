"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechSynthesisBookmarkEventArgs = void 0;
/**
 * Defines contents of speech synthesis bookmark event.
 * @class SpeechSynthesisBookmarkEventArgs
 * Added in version 1.16.0
 */
var SpeechSynthesisBookmarkEventArgs = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {string} text - The bookmark text.
     */
    function SpeechSynthesisBookmarkEventArgs(audioOffset, text) {
        this.privAudioOffset = audioOffset;
        this.privText = text;
    }
    Object.defineProperty(SpeechSynthesisBookmarkEventArgs.prototype, "audioOffset", {
        /**
         * Specifies the audio offset.
         * @member SpeechSynthesisBookmarkEventArgs.prototype.audioOffset
         * @function
         * @public
         * @returns {number} the audio offset.
         */
        get: function () {
            return this.privAudioOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisBookmarkEventArgs.prototype, "text", {
        /**
         * Specifies the bookmark.
         * @member SpeechSynthesisBookmarkEventArgs.prototype.text
         * @function
         * @public
         * @returns {string} the bookmark text.
         */
        get: function () {
            return this.privText;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechSynthesisBookmarkEventArgs;
}());
exports.SpeechSynthesisBookmarkEventArgs = SpeechSynthesisBookmarkEventArgs;

//# sourceMappingURL=SpeechSynthesisBookmarkEventArgs.js.map
