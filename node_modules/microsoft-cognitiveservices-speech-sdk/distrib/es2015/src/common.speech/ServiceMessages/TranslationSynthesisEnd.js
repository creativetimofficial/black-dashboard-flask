// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SynthesisStatus } from "../Exports";
export class TranslationSynthesisEnd {
    constructor(json) {
        this.privSynthesisEnd = JSON.parse(json);
        this.privSynthesisEnd.SynthesisStatus = SynthesisStatus[this.privSynthesisEnd.SynthesisStatus];
    }
    static fromJSON(json) {
        return new TranslationSynthesisEnd(json);
    }
    get SynthesisStatus() {
        return this.privSynthesisEnd.SynthesisStatus;
    }
    get FailureReason() {
        return this.privSynthesisEnd.FailureReason;
    }
}

//# sourceMappingURL=TranslationSynthesisEnd.js.map
