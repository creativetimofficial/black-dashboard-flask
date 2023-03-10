// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { RecognitionStatus } from "../Exports";
export class SimpleSpeechPhrase {
    constructor(json) {
        this.privSimpleSpeechPhrase = JSON.parse(json);
        this.privSimpleSpeechPhrase.RecognitionStatus = RecognitionStatus[this.privSimpleSpeechPhrase.RecognitionStatus];
    }
    static fromJSON(json) {
        return new SimpleSpeechPhrase(json);
    }
    get RecognitionStatus() {
        return this.privSimpleSpeechPhrase.RecognitionStatus;
    }
    get DisplayText() {
        return this.privSimpleSpeechPhrase.DisplayText;
    }
    get Offset() {
        return this.privSimpleSpeechPhrase.Offset;
    }
    get Duration() {
        return this.privSimpleSpeechPhrase.Duration;
    }
    get Language() {
        return this.privSimpleSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privSimpleSpeechPhrase.PrimaryLanguage.Language;
    }
    get LanguageDetectionConfidence() {
        return this.privSimpleSpeechPhrase.PrimaryLanguage === undefined ? undefined : this.privSimpleSpeechPhrase.PrimaryLanguage.Confidence;
    }
    get SpeakerId() {
        return this.privSimpleSpeechPhrase.SpeakerId;
    }
}

//# sourceMappingURL=SimpleSpeechPhrase.js.map
