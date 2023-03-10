"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechSynthesisResult = void 0;
var Exports_1 = require("./Exports");
/**
 * Defines result of speech synthesis.
 * @class SpeechSynthesisResult
 * Added in version 1.11.0
 */
var SpeechSynthesisResult = /** @class */ (function (_super) {
    __extends(SpeechSynthesisResult, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {ArrayBuffer} audioData - The synthesized audio binary.
     * @param {string} errorDetails - Error details, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     * @param {number} audioDuration - The audio duration.
     */
    function SpeechSynthesisResult(resultId, reason, audioData, errorDetails, properties, audioDuration) {
        var _this = _super.call(this, resultId, reason, errorDetails, properties) || this;
        _this.privAudioData = audioData;
        _this.privAudioDuration = audioDuration;
        return _this;
    }
    Object.defineProperty(SpeechSynthesisResult.prototype, "audioData", {
        /**
         * The synthesized audio data
         * @member SpeechSynthesisResult.prototype.audioData
         * @function
         * @public
         * @returns {ArrayBuffer} The synthesized audio data.
         */
        get: function () {
            return this.privAudioData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesisResult.prototype, "audioDuration", {
        /**
         * The time duration of synthesized audio, in ticks (100 nanoseconds).
         * @member SpeechSynthesisResult.prototype.audioDuration
         * @function
         * @public
         * @returns {number} The time duration of synthesized audio.
         */
        get: function () {
            return this.privAudioDuration;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechSynthesisResult;
}(Exports_1.SynthesisResult));
exports.SpeechSynthesisResult = SpeechSynthesisResult;

//# sourceMappingURL=SpeechSynthesisResult.js.map
