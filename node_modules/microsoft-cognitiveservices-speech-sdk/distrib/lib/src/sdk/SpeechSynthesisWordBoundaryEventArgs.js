"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechSynthesisWordBoundaryEventArgs = void 0;
/**
 * Defines contents of speech synthesis word boundary event.
 * @class SpeechSynthesisWordBoundaryEventArgs
 * Added in version 1.11.0
 */
var SpeechSynthesisWordBoundaryEventArgs = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {number} duration - The audio duration.
     * @param {string} text - The text.
     * @param {number} wordLength - The length of the word.
     * @param {number} textOffset - The text offset.
     * @param {SpeechSynthesisBoundaryType} boundaryType - The boundary type
     */
    function SpeechSynthesisWordBoundaryEventArgs(audioOffset, duration, text, wordLength, textOffset, boundaryType) {
        this.privAudioOffset = audioOffset;
        this.privDuration = duration;
        this.privText = text;
        this.privWordLength = wordLength;
        this.privTextOffset = textOffset;
        this.privBoundaryType = boundaryType;
    }
    Object.defineProperty(SpeechSynthesisWordBoundaryEventArgs.prototype, "audioOffset", {
        /**
         * Specifies the audio offset.
         * @member SpeechSynthesisWordBoundaryEventArgs.prototype.audioOffset
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
    Object.defineProperty(SpeechSynthesisWordBoundaryEventArgs.prototype, "duration", {
        /**
         * Specifies the duration, in ticks (100 nanoseconds).
         * @member SpeechSynthesisWordBoundaryEventArgs.prototype.duration
         * @function
         * @public
         * @returns {number} Duration in 100 nanosecond increments.
         */
        get: function () {
            return this.privDuration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisWordBoundaryEventArgs.prototype, "text", {
        /**
         * Specifies the text of the word boundary event.
         * @member SpeechSynthesisWordBoundaryEventArgs.prototype.text
         * @function
         * @public
         * @returns {string} the text.
         */
        get: function () {
            return this.privText;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisWordBoundaryEventArgs.prototype, "wordLength", {
        /**
         * Specifies the word length
         * @member SpeechSynthesisWordBoundaryEventArgs.prototype.wordLength
         * @function
         * @public
         * @returns {number} the word length
         */
        get: function () {
            return this.privWordLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisWordBoundaryEventArgs.prototype, "textOffset", {
        /**
         * Specifies the text offset.
         * @member SpeechSynthesisWordBoundaryEventArgs.prototype.textOffset
         * @function
         * @public
         * @returns {number} the text offset.
         */
        get: function () {
            return this.privTextOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisWordBoundaryEventArgs.prototype, "boundaryType", {
        /**
         * Specifies the boundary type.
         * @member SpeechSynthesisWordBoundaryEventArgs.prototype.boundaryType
         * @function
         * @public
         * @returns {SpeechSynthesisBoundaryType} the boundary type.
         */
        get: function () {
            return this.privBoundaryType;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechSynthesisWordBoundaryEventArgs;
}());
exports.SpeechSynthesisWordBoundaryEventArgs = SpeechSynthesisWordBoundaryEventArgs;

//# sourceMappingURL=SpeechSynthesisWordBoundaryEventArgs.js.map
