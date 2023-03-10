"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechSynthesisVisemeEventArgs = void 0;
/**
 * Defines contents of speech synthesis viseme event.
 * @class SpeechSynthesisVisemeEventArgs
 * Added in version 1.16.0
 */
var SpeechSynthesisVisemeEventArgs = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {number} visemeId - The viseme ID.
     * @param {string} animation - The animation, could be in svg or other format.
     */
    function SpeechSynthesisVisemeEventArgs(audioOffset, visemeId, animation) {
        this.privAudioOffset = audioOffset;
        this.privVisemeId = visemeId;
        this.privAnimation = animation;
    }
    Object.defineProperty(SpeechSynthesisVisemeEventArgs.prototype, "audioOffset", {
        /**
         * Specifies the audio offset.
         * @member SpeechSynthesisVisemeEventArgs.prototype.audioOffset
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
    Object.defineProperty(SpeechSynthesisVisemeEventArgs.prototype, "visemeId", {
        /**
         * Specifies the viseme ID.
         * @member SpeechSynthesisVisemeEventArgs.prototype.visemeId
         * @function
         * @public
         * @returns {number} the viseme ID.
         */
        get: function () {
            return this.privVisemeId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisVisemeEventArgs.prototype, "animation", {
        /**
         * Specifies the animation.
         * @member SpeechSynthesisVisemeEventArgs.prototype.animation
         * @function
         * @public
         * @returns {string} the animation, could be in svg or other format.
         */
        get: function () {
            return this.privAnimation;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechSynthesisVisemeEventArgs;
}());
exports.SpeechSynthesisVisemeEventArgs = SpeechSynthesisVisemeEventArgs;

//# sourceMappingURL=SpeechSynthesisVisemeEventArgs.js.map
