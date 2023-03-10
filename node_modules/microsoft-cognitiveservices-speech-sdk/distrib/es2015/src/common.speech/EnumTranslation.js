// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { CancellationErrorCode, CancellationReason, ResultReason } from "../sdk/Exports";
import { RecognitionStatus } from "./Exports";
export class EnumTranslation {
    static implTranslateRecognitionResult(recognitionStatus) {
        let reason = ResultReason.Canceled;
        switch (recognitionStatus) {
            case RecognitionStatus.Success:
                reason = ResultReason.RecognizedSpeech;
                break;
            case RecognitionStatus.NoMatch:
            case RecognitionStatus.InitialSilenceTimeout:
            case RecognitionStatus.BabbleTimeout:
            case RecognitionStatus.EndOfDictation:
                reason = ResultReason.NoMatch;
                break;
            case RecognitionStatus.Error:
            case RecognitionStatus.BadRequest:
            case RecognitionStatus.Forbidden:
            default:
                reason = ResultReason.Canceled;
                break;
        }
        return reason;
    }
    static implTranslateCancelResult(recognitionStatus) {
        let reason = CancellationReason.EndOfStream;
        switch (recognitionStatus) {
            case RecognitionStatus.Success:
            case RecognitionStatus.EndOfDictation:
            case RecognitionStatus.NoMatch:
                reason = CancellationReason.EndOfStream;
                break;
            case RecognitionStatus.InitialSilenceTimeout:
            case RecognitionStatus.BabbleTimeout:
            case RecognitionStatus.Error:
            case RecognitionStatus.BadRequest:
            case RecognitionStatus.Forbidden:
            default:
                reason = CancellationReason.Error;
                break;
        }
        return reason;
    }
    static implTranslateCancelErrorCode(recognitionStatus) {
        let reason = CancellationErrorCode.NoError;
        switch (recognitionStatus) {
            case RecognitionStatus.Error:
                reason = CancellationErrorCode.ServiceError;
                break;
            case RecognitionStatus.TooManyRequests:
                reason = CancellationErrorCode.TooManyRequests;
                break;
            case RecognitionStatus.BadRequest:
                reason = CancellationErrorCode.BadRequestParameters;
                break;
            case RecognitionStatus.Forbidden:
                reason = CancellationErrorCode.Forbidden;
                break;
            default:
                reason = CancellationErrorCode.NoError;
                break;
        }
        return reason;
    }
    static implTranslateErrorDetails(cancellationErrorCode) {
        let errorDetails = "The speech service encountered an internal error and could not continue.";
        switch (cancellationErrorCode) {
            case CancellationErrorCode.Forbidden:
                errorDetails = "The recognizer is using a free subscription that ran out of quota.";
                break;
            case CancellationErrorCode.BadRequestParameters:
                errorDetails = "Invalid parameter or unsupported audio format in the request.";
                break;
            case CancellationErrorCode.TooManyRequests:
                errorDetails = "The number of parallel requests exceeded the number of allowed concurrent transcriptions.";
                break;
            default:
                break;
        }
        return errorDetails;
    }
}

//# sourceMappingURL=EnumTranslation.js.map
