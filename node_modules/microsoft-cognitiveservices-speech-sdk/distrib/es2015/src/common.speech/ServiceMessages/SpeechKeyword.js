// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class SpeechKeyword {
    constructor(json) {
        this.privSpeechKeyword = JSON.parse(json);
    }
    static fromJSON(json) {
        return new SpeechKeyword(json);
    }
    get Status() {
        return this.privSpeechKeyword.Status;
    }
    get Text() {
        return this.privSpeechKeyword.Text;
    }
    get Offset() {
        return this.privSpeechKeyword.Offset;
    }
    get Duration() {
        return this.privSpeechKeyword.Duration;
    }
}

//# sourceMappingURL=SpeechKeyword.js.map
