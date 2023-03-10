"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhraseListGrammar = void 0;
/**
 * Allows additions of new phrases to improve speech recognition.
 *
 * Phrases added to the recognizer are effective at the start of the next recognition, or the next time the SpeechSDK must reconnect
 * to the speech service.
 */
var PhraseListGrammar = /** @class */ (function () {
    function PhraseListGrammar(recogBase) {
        this.privGrammerBuilder = recogBase.dynamicGrammar;
    }
    /**
     * Creates a PhraseListGrammar from a given speech recognizer. Will accept any recognizer that derives from @class Recognizer.
     * @param recognizer The recognizer to add phrase lists to.
     */
    PhraseListGrammar.fromRecognizer = function (recognizer) {
        var recoBase = recognizer.internalData;
        return new PhraseListGrammar(recoBase);
    };
    /**
     * Adds a single phrase to the current recognizer.
     * @param phrase Phrase to add.
     */
    PhraseListGrammar.prototype.addPhrase = function (phrase) {
        this.privGrammerBuilder.addPhrase(phrase);
    };
    /**
     * Adds multiple phrases to the current recognizer.
     * @param phrases Array of phrases to add.
     */
    PhraseListGrammar.prototype.addPhrases = function (phrases) {
        this.privGrammerBuilder.addPhrase(phrases);
    };
    /**
     * Clears all phrases added to the current recognizer.
     */
    PhraseListGrammar.prototype.clear = function () {
        this.privGrammerBuilder.clearPhrases();
    };
    return PhraseListGrammar;
}());
exports.PhraseListGrammar = PhraseListGrammar;

//# sourceMappingURL=PhraseListGrammar.js.map
