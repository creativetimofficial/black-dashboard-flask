// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { PropertyId } from "../sdk/Exports";
/**
 * Represents the JSON used in the synthesis.context message sent to the speech service.
 * The dynamic grammar is always refreshed from the encapsulated dynamic grammar object.
 */
export class SynthesisContext {
    constructor(speechSynthesizer) {
        this.privContext = {};
        this.privSpeechSynthesizer = speechSynthesizer;
    }
    /**
     * Adds a section to the synthesis.context object.
     * @param sectionName Name of the section to add.
     * @param value JSON serializable object that represents the value.
     */
    setSection(sectionName, value) {
        this.privContext[sectionName] = value;
    }
    /**
     * Sets the audio output format for synthesis context generation.
     * @param format {AudioOutputFormatImpl} the output format
     */
    set audioOutputFormat(format) {
        this.privAudioOutputFormat = format;
    }
    toJSON() {
        const synthesisSection = this.buildSynthesisContext();
        this.setSection("synthesis", synthesisSection);
        return JSON.stringify(this.privContext);
    }
    buildSynthesisContext() {
        return {
            audio: {
                metadataOptions: {
                    bookmarkEnabled: (!!this.privSpeechSynthesizer.bookmarkReached),
                    punctuationBoundaryEnabled: this.privSpeechSynthesizer.properties.getProperty(PropertyId.SpeechServiceResponse_RequestPunctuationBoundary, (!!this.privSpeechSynthesizer.wordBoundary)),
                    sentenceBoundaryEnabled: this.privSpeechSynthesizer.properties.getProperty(PropertyId.SpeechServiceResponse_RequestSentenceBoundary, false),
                    sessionEndEnabled: true,
                    visemeEnabled: (!!this.privSpeechSynthesizer.visemeReceived),
                    wordBoundaryEnabled: this.privSpeechSynthesizer.properties.getProperty(PropertyId.SpeechServiceResponse_RequestWordBoundary, (!!this.privSpeechSynthesizer.wordBoundary)),
                },
                outputFormat: this.privAudioOutputFormat.requestAudioFormatString,
            },
            language: {
                autoDetection: this.privSpeechSynthesizer.autoDetectSourceLanguage
            }
        };
    }
}

//# sourceMappingURL=SynthesisContext.js.map
