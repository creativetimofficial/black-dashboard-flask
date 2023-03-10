"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesisResult = void 0;
/**
 * Base class for synthesis results
 * @class SynthesisResult
 * Added in version 1.20.0
 */
var SynthesisResult = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} errorDetails - Error details, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     */
    function SynthesisResult(resultId, reason, errorDetails, properties) {
        this.privResultId = resultId;
        this.privReason = reason;
        this.privErrorDetails = errorDetails;
        this.privProperties = properties;
    }
    Object.defineProperty(SynthesisResult.prototype, "resultId", {
        /**
         * Specifies the result identifier.
         * @member SynthesisResult.prototype.resultId
         * @function
         * @public
         * @returns {string} Specifies the result identifier.
         */
        get: function () {
            return this.privResultId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisResult.prototype, "reason", {
        /**
         * Specifies status of the result.
         * @member SynthesisResult.prototype.reason
         * @function
         * @public
         * @returns {ResultReason} Specifies status of the result.
         */
        get: function () {
            return this.privReason;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisResult.prototype, "errorDetails", {
        /**
         * In case of an unsuccessful synthesis, provides details of the occurred error.
         * @member SynthesisResult.prototype.errorDetails
         * @function
         * @public
         * @returns {string} a brief description of an error.
         */
        get: function () {
            return this.privErrorDetails;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisResult.prototype, "properties", {
        /**
         * The set of properties exposed in the result.
         * @member SynthesisResult.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The set of properties exposed in the result.
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    return SynthesisResult;
}());
exports.SynthesisResult = SynthesisResult;

//# sourceMappingURL=SynthesisResult.js.map
