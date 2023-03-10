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
exports.VoiceProfileCancellationDetails = exports.VoiceProfileResult = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common.speech/Exports");
var Contracts_1 = require("./Contracts");
var Exports_2 = require("./Exports");
/**
 * Output format
 * @class VoiceProfileResult
 */
var VoiceProfileResult = /** @class */ (function () {
    function VoiceProfileResult(reason, statusText) {
        this.privReason = reason;
        this.privProperties = new Exports_2.PropertyCollection();
        if (reason === Exports_2.ResultReason.Canceled) {
            Contracts_1.Contracts.throwIfNullOrUndefined(statusText, "statusText");
            this.privErrorDetails = statusText;
            this.privProperties.setProperty(Exports_1.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[Exports_2.CancellationErrorCode.ServiceError]);
        }
    }
    Object.defineProperty(VoiceProfileResult.prototype, "reason", {
        get: function () {
            return this.privReason;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileResult.prototype, "properties", {
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileResult.prototype, "errorDetails", {
        get: function () {
            return this.privErrorDetails;
        },
        enumerable: false,
        configurable: true
    });
    return VoiceProfileResult;
}());
exports.VoiceProfileResult = VoiceProfileResult;
/**
 * @class VoiceProfileCancellationDetails
 */
var VoiceProfileCancellationDetails = /** @class */ (function (_super) {
    __extends(VoiceProfileCancellationDetails, _super);
    function VoiceProfileCancellationDetails(reason, errorDetails, errorCode) {
        return _super.call(this, reason, errorDetails, errorCode) || this;
    }
    /**
     * Creates an instance of VoiceProfileCancellationDetails object for the canceled VoiceProfileResult.
     * @member VoiceProfileCancellationDetails.fromResult
     * @function
     * @public
     * @param {VoiceProfileResult} result - The result that was canceled.
     * @returns {VoiceProfileCancellationDetails} The cancellation details object being created.
     */
    VoiceProfileCancellationDetails.fromResult = function (result) {
        var reason = Exports_2.CancellationReason.Error;
        var errorCode = Exports_2.CancellationErrorCode.NoError;
        if (!!result.properties) {
            errorCode = Exports_2.CancellationErrorCode[result.properties.getProperty(Exports_1.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[Exports_2.CancellationErrorCode.NoError])]; //eslint-disable-line
        }
        return new VoiceProfileCancellationDetails(reason, result.errorDetails, errorCode);
    };
    return VoiceProfileCancellationDetails;
}(Exports_2.CancellationDetailsBase));
exports.VoiceProfileCancellationDetails = VoiceProfileCancellationDetails;

//# sourceMappingURL=VoiceProfileResult.js.map
