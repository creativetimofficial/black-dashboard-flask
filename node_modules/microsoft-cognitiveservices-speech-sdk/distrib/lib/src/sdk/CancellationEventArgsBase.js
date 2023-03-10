"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationEventArgsBase = void 0;
var Exports_1 = require("./Exports");
/**
 * Defines content of a CancellationEvent.
 * @class CancellationEventArgsBase
 */
var CancellationEventArgsBase = /** @class */ (function (_super) {
    __extends(CancellationEventArgsBase, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {CancellationReason} reason - The cancellation reason.
     * @param {string} errorDetails - Error details, if provided.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    function CancellationEventArgsBase(reason, errorDetails, errorCode, offset, sessionId) {
        var _this = _super.call(this, offset, sessionId) || this;
        _this.privReason = reason;
        _this.privErrorDetails = errorDetails;
        _this.privErrorCode = errorCode;
        return _this;
    }
    Object.defineProperty(CancellationEventArgsBase.prototype, "reason", {
        /**
         * The reason the recognition was canceled.
         * @member CancellationEventArgsBase.prototype.reason
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
    Object.defineProperty(CancellationEventArgsBase.prototype, "errorCode", {
        /**
         * The error code in case of an unsuccessful operation.
         * @return An error code that represents the error reason.
         */
        get: function () {
            return this.privErrorCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CancellationEventArgsBase.prototype, "errorDetails", {
        /**
         * In case of an unsuccessful operation, provides details of the occurred error.
         * @member CancellationEventArgsBase.prototype.errorDetails
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
    return CancellationEventArgsBase;
}(Exports_1.RecognitionEventArgs));
exports.CancellationEventArgsBase = CancellationEventArgsBase;

//# sourceMappingURL=CancellationEventArgsBase.js.map
