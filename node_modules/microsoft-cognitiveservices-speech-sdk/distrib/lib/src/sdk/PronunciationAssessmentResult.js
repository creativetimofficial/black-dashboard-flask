"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PronunciationAssessmentResult = void 0;
var Contracts_1 = require("./Contracts");
var Exports_1 = require("./Exports");
/**
 * Pronunciation assessment results.
 * @class PronunciationAssessmentResult
 * Added in version 1.15.0.
 */
var PronunciationAssessmentResult = /** @class */ (function () {
    function PronunciationAssessmentResult(jsonString) {
        var j = JSON.parse(jsonString);
        Contracts_1.Contracts.throwIfNullOrUndefined(j.NBest[0], "NBest");
        this.privPronJson = j.NBest[0];
    }
    /**
     * @member PronunciationAssessmentResult.fromResult
     * @function
     * @public
     * @param {RecognitionResult} result The recognition result.
     * @return {PronunciationAssessmentConfig} Instance of PronunciationAssessmentConfig
     * @summary Creates an instance of the PronunciationAssessmentResult from recognition result.
     */
    PronunciationAssessmentResult.fromResult = function (result) {
        Contracts_1.Contracts.throwIfNullOrUndefined(result, "result");
        var json = result.properties.getProperty(Exports_1.PropertyId.SpeechServiceResponse_JsonResult);
        Contracts_1.Contracts.throwIfNullOrUndefined(json, "json");
        return new PronunciationAssessmentResult(json);
    };
    Object.defineProperty(PronunciationAssessmentResult.prototype, "detailResult", {
        /**
         * Gets the detail result of pronunciation assessment.
         * @member PronunciationAssessmentConfig.prototype.detailResult
         * @function
         * @public
         * @returns {DetailResult} detail result.
         */
        get: function () {
            return this.privPronJson;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PronunciationAssessmentResult.prototype, "accuracyScore", {
        /**
         * The score indicating the pronunciation accuracy of the given speech, which indicates
         * how closely the phonemes match a native speaker's pronunciation.
         * @member PronunciationAssessmentResult.prototype.accuracyScore
         * @function
         * @public
         * @returns {number} Accuracy score.
         */
        get: function () {
            return this.detailResult.PronunciationAssessment.AccuracyScore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PronunciationAssessmentResult.prototype, "pronunciationScore", {
        /**
         * The overall score indicating the pronunciation quality of the given speech.
         * This is calculated from AccuracyScore, FluencyScore and CompletenessScore with weight.
         * @member PronunciationAssessmentResult.prototype.pronunciationScore
         * @function
         * @public
         * @returns {number} Pronunciation score.
         */
        get: function () {
            return this.detailResult.PronunciationAssessment.PronScore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PronunciationAssessmentResult.prototype, "completenessScore", {
        /**
         * The score indicating the completeness of the given speech by calculating the ratio of pronounced words towards entire input.
         * @member PronunciationAssessmentResult.prototype.completenessScore
         * @function
         * @public
         * @returns {number} Completeness score.
         */
        get: function () {
            return this.detailResult.PronunciationAssessment.CompletenessScore;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PronunciationAssessmentResult.prototype, "fluencyScore", {
        /**
         * The score indicating the fluency of the given speech.
         * @member PronunciationAssessmentResult.prototype.fluencyScore
         * @function
         * @public
         * @returns {number} Fluency score.
         */
        get: function () {
            return this.detailResult.PronunciationAssessment.FluencyScore;
        },
        enumerable: false,
        configurable: true
    });
    return PronunciationAssessmentResult;
}());
exports.PronunciationAssessmentResult = PronunciationAssessmentResult;

//# sourceMappingURL=PronunciationAssessmentResult.js.map
