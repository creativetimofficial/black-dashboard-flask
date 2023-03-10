// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Defines the pronunciation evaluation granularity; default value is Phoneme.
 * Added in version 1.15.0
 * @class PronunciationAssessmentGranularity
 */
export var PronunciationAssessmentGranularity;
(function (PronunciationAssessmentGranularity) {
    /**
     * Shows the score on the full text, word and phoneme level
     * @member PronunciationAssessmentGranularity.Phoneme
     */
    PronunciationAssessmentGranularity[PronunciationAssessmentGranularity["Phoneme"] = 1] = "Phoneme";
    /**
     * Shows the score on the full text and word level
     * @member PronunciationAssessmentGranularity.Word
     */
    PronunciationAssessmentGranularity[PronunciationAssessmentGranularity["Word"] = 2] = "Word";
    /**
     * Shows the score on the full text level only
     * @member PronunciationAssessmentGranularity.FullText
     */
    PronunciationAssessmentGranularity[PronunciationAssessmentGranularity["FullText"] = 3] = "FullText";
})(PronunciationAssessmentGranularity || (PronunciationAssessmentGranularity = {}));

//# sourceMappingURL=PronunciationAssessmentGranularity.js.map
