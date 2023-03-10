// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class SpeechHypothesis {
    constructor(json) {
        this.privSpeechHypothesis = JSON.parse(json);
    }
    static fromJSON(json) {
        return new SpeechHypothesis(json);
    }
    get Text() {
        return this.privSpeechHypothesis.Text;
    }
    get Offset() {
        return this.privSpeechHypothesis.Offset;
    }
    get Duration() {
        return this.privSpeechHypothesis.Duration;
    }
    get Language() {
        return this.privSpeechHypothesis.PrimaryLanguage === undefined ? undefined : this.privSpeechHypothesis.PrimaryLanguage.Language;
    }
    get LanguageDetectionConfidence() {
        return this.privSpeechHypothesis.PrimaryLanguage === undefined ? undefined : this.privSpeechHypothesis.PrimaryLanguage.Confidence;
    }
    get SpeakerId() {
        return this.privSpeechHypothesis.SpeakerId;
    }
}

//# sourceMappingURL=SpeechHypothesis.js.map
