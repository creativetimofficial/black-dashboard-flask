// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Defines contents of speech synthesis viseme event.
 * @class SpeechSynthesisVisemeEventArgs
 * Added in version 1.16.0
 */
export class SpeechSynthesisVisemeEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} audioOffset - The audio offset.
     * @param {number} visemeId - The viseme ID.
     * @param {string} animation - The animation, could be in svg or other format.
     */
    constructor(audioOffset, visemeId, animation) {
        this.privAudioOffset = audioOffset;
        this.privVisemeId = visemeId;
        this.privAnimation = animation;
    }
    /**
     * Specifies the audio offset.
     * @member SpeechSynthesisVisemeEventArgs.prototype.audioOffset
     * @function
     * @public
     * @returns {number} the audio offset.
     */
    get audioOffset() {
        return this.privAudioOffset;
    }
    /**
     * Specifies the viseme ID.
     * @member SpeechSynthesisVisemeEventArgs.prototype.visemeId
     * @function
     * @public
     * @returns {number} the viseme ID.
     */
    get visemeId() {
        return this.privVisemeId;
    }
    /**
     * Specifies the animation.
     * @member SpeechSynthesisVisemeEventArgs.prototype.animation
     * @function
     * @public
     * @returns {string} the animation, could be in svg or other format.
     */
    get animation() {
        return this.privAnimation;
    }
}

//# sourceMappingURL=SpeechSynthesisVisemeEventArgs.js.map
