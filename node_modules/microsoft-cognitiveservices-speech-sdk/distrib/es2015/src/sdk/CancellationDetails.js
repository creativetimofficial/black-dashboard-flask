// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { CancellationErrorCodePropertyName, EnumTranslation, SimpleSpeechPhrase } from "../common.speech/Exports";
import { CancellationDetailsBase } from "./CancellationDetailsBase";
import { CancellationErrorCode, CancellationReason, RecognitionResult } from "./Exports";
/**
 * Contains detailed information about why a result was canceled.
 * @class CancellationDetails
 */
export class CancellationDetails extends CancellationDetailsBase {
    constructor(reason, errorDetails, errorCode) {
        super(reason, errorDetails, errorCode);
    }
    /**
     * Creates an instance of CancellationDetails object for the canceled RecognitionResult.
     * @member CancellationDetails.fromResult
     * @function
     * @public
     * @param {RecognitionResult | SpeechSynthesisResult} result - The result that was canceled.
     * @returns {CancellationDetails} The cancellation details object being created.
     */
    static fromResult(result) {
        let reason = CancellationReason.Error;
        let errorCode = CancellationErrorCode.NoError;
        if (result instanceof RecognitionResult && !!result.json) {
            const simpleSpeech = SimpleSpeechPhrase.fromJSON(result.json);
            reason = EnumTranslation.implTranslateCancelResult(simpleSpeech.RecognitionStatus);
        }
        if (!!result.properties) {
            errorCode = CancellationErrorCode[result.properties.getProperty(CancellationErrorCodePropertyName, CancellationErrorCode[CancellationErrorCode.NoError])];
        }
        return new CancellationDetails(reason, result.errorDetails || EnumTranslation.implTranslateErrorDetails(errorCode), errorCode);
    }
}

//# sourceMappingURL=CancellationDetails.js.map
