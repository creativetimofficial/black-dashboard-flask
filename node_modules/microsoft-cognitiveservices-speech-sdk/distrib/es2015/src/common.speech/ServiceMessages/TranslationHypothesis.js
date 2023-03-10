// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { TranslationStatus } from "../TranslationStatus";
export class TranslationHypothesis {
    constructor(json) {
        this.privTranslationHypothesis = JSON.parse(json);
        this.privTranslationHypothesis.Translation.TranslationStatus = TranslationStatus[this.privTranslationHypothesis.Translation.TranslationStatus];
    }
    static fromJSON(json) {
        return new TranslationHypothesis(json);
    }
    get Duration() {
        return this.privTranslationHypothesis.Duration;
    }
    get Offset() {
        return this.privTranslationHypothesis.Offset;
    }
    get Text() {
        return this.privTranslationHypothesis.Text;
    }
    get Translation() {
        return this.privTranslationHypothesis.Translation;
    }
}

//# sourceMappingURL=TranslationHypothesis.js.map
