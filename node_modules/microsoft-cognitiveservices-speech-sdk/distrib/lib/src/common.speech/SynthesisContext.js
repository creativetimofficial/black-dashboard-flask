"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesisContext = void 0;
var Exports_1 = require("../sdk/Exports");
/**
 * Represents the JSON used in the synthesis.context message sent to the speech service.
 * The dynamic grammar is always refreshed from the encapsulated dynamic grammar object.
 */
var SynthesisContext = /** @class */ (function () {
    function SynthesisContext(speechSynthesizer) {
        this.privContext = {};
        this.privSpeechSynthesizer = speechSynthesizer;
    }
    /**
     * Adds a section to the synthesis.context object.
     * @param sectionName Name of the section to add.
     * @param value JSON serializable object that represents the value.
     */
    SynthesisContext.prototype.setSection = function (sectionName, value) {
        this.privContext[sectionName] = value;
    };
    Object.defineProperty(SynthesisContext.prototype, "audioOutputFormat", {
        /**
         * Sets the audio output format for synthesis context generation.
         * @param format {AudioOutputFormatImpl} the output format
         */
        set: function (format) {
            this.privAudioOutputFormat = format;
        },
        enumerable: false,
        configurable: true
    });
    SynthesisContext.prototype.toJSON = function () {
        var synthesisSection = this.buildSynthesisContext();
        this.setSection("synthesis", synthesisSection);
        return JSON.stringify(this.privContext);
    };
    SynthesisContext.prototype.buildSynthesisContext = function () {
        return {
            audio: {
                metadataOptions: {
                    bookmarkEnabled: (!!this.privSpeechSynthesizer.bookmarkReached),
                    punctuationBoundaryEnabled: this.privSpeechSynthesizer.properties.getProperty(Exports_1.PropertyId.SpeechServiceResponse_RequestPunctuationBoundary, (!!this.privSpeechSynthesizer.wordBoundary)),
                    sentenceBoundaryEnabled: this.privSpeechSynthesizer.properties.getProperty(Exports_1.PropertyId.SpeechServiceResponse_RequestSentenceBoundary, false),
                    sessionEndEnabled: true,
                    visemeEnabled: (!!this.privSpeechSynthesizer.visemeReceived),
                    wordBoundaryEnabled: this.privSpeechSynthesizer.properties.getProperty(Exports_1.PropertyId.SpeechServiceResponse_RequestWordBoundary, (!!this.privSpeechSynthesizer.wordBoundary)),
                },
                outputFormat: this.privAudioOutputFormat.requestAudioFormatString,
            },
            language: {
                autoDetection: this.privSpeechSynthesizer.autoDetectSourceLanguage
            }
        };
    };
    return SynthesisContext;
}());
exports.SynthesisContext = SynthesisContext;

//# sourceMappingURL=SynthesisContext.js.map
