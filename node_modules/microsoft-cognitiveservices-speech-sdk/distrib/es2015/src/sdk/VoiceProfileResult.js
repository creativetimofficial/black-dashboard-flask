// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { CancellationErrorCodePropertyName } from "../common.speech/Exports";
import { Contracts } from "./Contracts";
import { CancellationDetailsBase, CancellationErrorCode, CancellationReason, PropertyCollection, ResultReason } from "./Exports";
/**
 * Output format
 * @class VoiceProfileResult
 */
export class VoiceProfileResult {
    constructor(reason, statusText) {
        this.privReason = reason;
        this.privProperties = new PropertyCollection();
        if (reason === ResultReason.Canceled) {
            Contracts.throwIfNullOrUndefined(statusText, "statusText");
            this.privErrorDetails = statusText;
            this.privProperties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[CancellationErrorCode.ServiceError]);
        }
    }
    get reason() {
        return this.privReason;
    }
    get properties() {
        return this.privProperties;
    }
    get errorDetails() {
        return this.privErrorDetails;
    }
}
/**
 * @class VoiceProfileCancellationDetails
 */
export class VoiceProfileCancellationDetails extends CancellationDetailsBase {
    constructor(reason, errorDetails, errorCode) {
        super(reason, errorDetails, errorCode);
    }
    /**
     * Creates an instance of VoiceProfileCancellationDetails object for the canceled VoiceProfileResult.
     * @member VoiceProfileCancellationDetails.fromResult
     * @function
     * @public
     * @param {VoiceProfileResult} result - The result that was canceled.
     * @returns {VoiceProfileCancellationDetails} The cancellation details object being created.
     */
    static fromResult(result) {
        const reason = CancellationReason.Error;
        let errorCode = CancellationErrorCode.NoError;
        if (!!result.properties) {
            errorCode = CancellationErrorCode[result.properties.getProperty(CancellationErrorCodePropertyName, CancellationErrorCode[CancellationErrorCode.NoError])]; //eslint-disable-line
        }
        return new VoiceProfileCancellationDetails(reason, result.errorDetails, errorCode);
    }
}

//# sourceMappingURL=VoiceProfileResult.js.map
