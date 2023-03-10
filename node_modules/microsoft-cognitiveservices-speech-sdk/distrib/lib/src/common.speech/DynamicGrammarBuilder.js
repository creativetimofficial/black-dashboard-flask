"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicGrammarBuilder = void 0;
/**
 * Responsible for building the object to be sent to the speech service to support dynamic grammars.
 * @class DynamicGrammarBuilder
 */
var DynamicGrammarBuilder = /** @class */ (function () {
    function DynamicGrammarBuilder() {
    }
    // Adds one more reference phrases to the dynamic grammar to send.
    // All added phrases are generic phrases.
    DynamicGrammarBuilder.prototype.addPhrase = function (phrase) {
        if (!this.privPhrases) {
            this.privPhrases = [];
        }
        if (phrase instanceof Array) {
            this.privPhrases = this.privPhrases.concat(phrase);
        }
        else {
            this.privPhrases.push(phrase);
        }
    };
    // Clears all phrases stored in the current object.
    DynamicGrammarBuilder.prototype.clearPhrases = function () {
        this.privPhrases = undefined;
    };
    // Adds one or more reference grammars to the current grammar.
    DynamicGrammarBuilder.prototype.addReferenceGrammar = function (grammar) {
        if (!this.privGrammars) {
            this.privGrammars = [];
        }
        if (grammar instanceof Array) {
            this.privGrammars = this.privGrammars.concat(grammar);
        }
        else {
            this.privGrammars.push(grammar);
        }
    };
    // clears all grammars stored on the recognizer.
    DynamicGrammarBuilder.prototype.clearGrammars = function () {
        this.privGrammars = undefined;
    };
    // Generates an object that represents the dynamic grammar used by the Speech Service.
    // This is done by building an object with the correct layout based on the phrases and reference grammars added to this instance
    // of a DynamicGrammarBuilder
    DynamicGrammarBuilder.prototype.generateGrammarObject = function () {
        if (this.privGrammars === undefined && this.privPhrases === undefined) {
            return undefined;
        }
        var retObj = {};
        retObj.ReferenceGrammars = this.privGrammars;
        if (undefined !== this.privPhrases && 0 !== this.privPhrases.length) {
            var retPhrases_1 = [];
            this.privPhrases.forEach(function (value) {
                retPhrases_1.push({
                    Text: value,
                });
            });
            retObj.Groups = [{ Type: "Generic", Items: retPhrases_1 }];
        }
        return retObj;
    };
    return DynamicGrammarBuilder;
}());
exports.DynamicGrammarBuilder = DynamicGrammarBuilder;

//# sourceMappingURL=DynamicGrammarBuilder.js.map
