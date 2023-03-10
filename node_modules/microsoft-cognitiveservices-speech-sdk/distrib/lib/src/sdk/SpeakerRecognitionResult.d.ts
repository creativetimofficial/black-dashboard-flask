import { CancellationDetailsBase, PropertyCollection, ResultReason } from "./Exports";
export declare enum SpeakerRecognitionResultType {
    Verify = 0,
    Identify = 1
}
/**
 * Output format
 * @class SpeakerRecognitionResult
 */
export declare class SpeakerRecognitionResult {
    private privReason;
    private privProperties;
    private privProfileId;
    private privScore;
    private privErrorDetails;
    constructor(resultType: SpeakerRecognitionResultType, data: string, profileId: string, resultReason?: ResultReason);
    get properties(): PropertyCollection;
    get reason(): ResultReason;
    get profileId(): string;
    get errorDetails(): string;
    get score(): number;
}
/**
 * @class SpeakerRecognitionCancellationDetails
 */
export declare class SpeakerRecognitionCancellationDetails extends CancellationDetailsBase {
    private constructor();
    /**
     * Creates an instance of SpeakerRecognitionCancellationDetails object for the canceled SpeakerRecognitionResult
     * @member SpeakerRecognitionCancellationDetails.fromResult
     * @function
     * @public
     * @param {SpeakerRecognitionResult} result - The result that was canceled.
     * @returns {SpeakerRecognitionCancellationDetails} The cancellation details object being created.
     */
    static fromResult(result: SpeakerRecognitionResult): SpeakerRecognitionCancellationDetails;
}
