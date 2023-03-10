// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class SpeechDetected {
    constructor(json) {
        this.privSpeechStartDetected = JSON.parse(json);
    }
    static fromJSON(json) {
        return new SpeechDetected(json);
    }
    get Offset() {
        return this.privSpeechStartDetected.Offset;
    }
}

//# sourceMappingURL=SpeechDetected.js.map
