"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationDetailsBase = void 0;
/**
 * Contains detailed information about why a result was canceled.
 * @class CancellationDetailsBase
 */
var CancellationDetailsBase = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {CancellationReason} reason - The cancellation reason.
     * @param {string} errorDetails - The error details, if provided.
     */
    function CancellationDetailsBase(reason, errorDetails, errorCode) {
        this.privReason = reason;
        this.privErrorDetails = errorDetails;
        this.privErrorCode = errorCode;
    }
    Object.defineProperty(CancellationDetailsBase.prototype, "reason", {
        /**
         * The reason the recognition was canceled.
         * @member CancellationDetailsBase.prototype.reason
         * @function
         * @public
         * @returns {CancellationReason} Specifies the reason canceled.
         */
        get: function () {
            return this.privReason;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CancellationDetailsBase.prototype, "errorDetails", {
        /**
         * In case of an unsuccessful recognition, provides details of the occurred error.
         * @member CancellationDetailsBase.prototype.errorDetails
         * @function
         * @public
         * @returns {string} A String that represents the error details.
         */
        get: function () {
            return this.privErrorDetails;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CancellationDetailsBase.prototype, "ErrorCode", {
        /**
         * The error code in case of an unsuccessful recognition.
         * Added in version 1.1.0.
         * @return An error code that represents the error reason.
         */
        get: function () {
            return this.privErrorCode;
        },
        enumerable: false,
        configurable: true
    });
    return CancellationDetailsBase;
}());
exports.CancellationDetailsBase = CancellationDetailsBase;

//# sourceMappingURL=CancellationDetailsBase.js.map
