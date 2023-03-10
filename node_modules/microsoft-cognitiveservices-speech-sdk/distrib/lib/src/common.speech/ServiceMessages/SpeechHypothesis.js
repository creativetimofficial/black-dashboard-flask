"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechHypothesis = void 0;
var SpeechHypothesis = /** @class */ (function () {
    function SpeechHypothesis(json) {
        this.privSpeechHypothesis = JSON.parse(json);
    }
    SpeechHypothesis.fromJSON = function (json) {
        return new SpeechHypothesis(json);
    };
    Object.defineProperty(SpeechHypothesis.prototype, "Text", {
        get: function () {
            return this.privSpeechHypothesis.Text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechHypothesis.prototype, "Offset", {
        get: function () {
            return this.privSpeechHypothesis.Offset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechHypothesis.prototype, "Duration", {
        get: function () {
            return this.privSpeechHypothesis.Duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechHypothesis.prototype, "Language", {
        get: function () {
            return this.privSpeechHypothesis.PrimaryLanguage === undefined ? undefined : this.privSpeechHypothesis.PrimaryLanguage.Language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechHypothesis.prototype, "LanguageDetectionConfidence", {
        get: function () {
            return this.privSpeechHypothesis.PrimaryLanguage === undefined ? undefined : this.privSpeechHypothesis.PrimaryLanguage.Confidence;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechHypothesis.prototype, "SpeakerId", {
        get: function () {
            return this.privSpeechHypothesis.SpeakerId;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechHypothesis;
}());
exports.SpeechHypothesis = SpeechHypothesis;

//# sourceMappingURL=SpeechHypothesis.js.map
