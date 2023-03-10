"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumTranslation = void 0;
var Exports_1 = require("../sdk/Exports");
var Exports_2 = require("./Exports");
var EnumTranslation = /** @class */ (function () {
    function EnumTranslation() {
    }
    EnumTranslation.implTranslateRecognitionResult = function (recognitionStatus) {
        var reason = Exports_1.ResultReason.Canceled;
        switch (recognitionStatus) {
            case Exports_2.RecognitionStatus.Success:
                reason = Exports_1.ResultReason.RecognizedSpeech;
                break;
            case Exports_2.RecognitionStatus.NoMatch:
            case Exports_2.RecognitionStatus.InitialSilenceTimeout:
            case Exports_2.RecognitionStatus.BabbleTimeout:
            case Exports_2.RecognitionStatus.EndOfDictation:
                reason = Exports_1.ResultReason.NoMatch;
                break;
            case Exports_2.RecognitionStatus.Error:
            case Exports_2.RecognitionStatus.BadRequest:
            case Exports_2.RecognitionStatus.Forbidden:
            default:
                reason = Exports_1.ResultReason.Canceled;
                break;
        }
        return reason;
    };
    EnumTranslation.implTranslateCancelResult = function (recognitionStatus) {
        var reason = Exports_1.CancellationReason.EndOfStream;
        switch (recognitionStatus) {
            case Exports_2.RecognitionStatus.Success:
            case Exports_2.RecognitionStatus.EndOfDictation:
            case Exports_2.RecognitionStatus.NoMatch:
                reason = Exports_1.CancellationReason.EndOfStream;
                break;
            case Exports_2.RecognitionStatus.InitialSilenceTimeout:
            case Exports_2.RecognitionStatus.BabbleTimeout:
            case Exports_2.RecognitionStatus.Error:
            case Exports_2.RecognitionStatus.BadRequest:
            case Exports_2.RecognitionStatus.Forbidden:
            default:
                reason = Exports_1.CancellationReason.Error;
                break;
        }
        return reason;
    };
    EnumTranslation.implTranslateCancelErrorCode = function (recognitionStatus) {
        var reason = Exports_1.CancellationErrorCode.NoError;
        switch (recognitionStatus) {
            case Exports_2.RecognitionStatus.Error:
                reason = Exports_1.CancellationErrorCode.ServiceError;
                break;
            case Exports_2.RecognitionStatus.TooManyRequests:
                reason = Exports_1.CancellationErrorCode.TooManyRequests;
                break;
            case Exports_2.RecognitionStatus.BadRequest:
                reason = Exports_1.CancellationErrorCode.BadRequestParameters;
                break;
            case Exports_2.RecognitionStatus.Forbidden:
                reason = Exports_1.CancellationErrorCode.Forbidden;
                break;
            default:
                reason = Exports_1.CancellationErrorCode.NoError;
                break;
        }
        return reason;
    };
    EnumTranslation.implTranslateErrorDetails = function (cancellationErrorCode) {
        var errorDetails = "The speech service encountered an internal error and could not continue.";
        switch (cancellationErrorCode) {
            case Exports_1.CancellationErrorCode.Forbidden:
                errorDetails = "The recognizer is using a free subscription that ran out of quota.";
                break;
            case Exports_1.CancellationErrorCode.BadRequestParameters:
                errorDetails = "Invalid parameter or unsupported audio format in the request.";
                break;
            case Exports_1.CancellationErrorCode.TooManyRequests:
                errorDetails = "The number of parallel requests exceeded the number of allowed concurrent transcriptions.";
                break;
            default:
                break;
        }
        return errorDetails;
    };
    return EnumTranslation;
}());
exports.EnumTranslation = EnumTranslation;

//# sourceMappingURL=EnumTranslation.js.map
