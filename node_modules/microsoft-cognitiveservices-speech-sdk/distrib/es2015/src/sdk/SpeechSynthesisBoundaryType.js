// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Defines the boundary type of speech synthesis boundary event.
 * @class SpeechSynthesisBoundaryType
 * Added in version 1.21.0
 */
export var SpeechSynthesisBoundaryType;
(function (SpeechSynthesisBoundaryType) {
    /**
     * Indicates the boundary text is a word.
     * @member SpeechSynthesisBoundaryType.Word
     */
    SpeechSynthesisBoundaryType["Word"] = "WordBoundary";
    /**
     * Indicates the boundary text is a punctuation.
     * @member SpeechSynthesisBoundaryType.Punctuation
     */
    SpeechSynthesisBoundaryType["Punctuation"] = "PunctuationBoundary";
    /**
     * Indicates the boundary text is a sentence.
     * @member SpeechSynthesisBoundaryType.Sentence
     */
    SpeechSynthesisBoundaryType["Sentence"] = "SentenceBoundary";
})(SpeechSynthesisBoundaryType || (SpeechSynthesisBoundaryType = {}));

//# sourceMappingURL=SpeechSynthesisBoundaryType.js.map
