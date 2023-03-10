import { CancellationErrorCode, CancellationReason, ResultReason } from "../sdk/Exports";
import { RecognitionStatus } from "./Exports";
export declare class EnumTranslation {
    static implTranslateRecognitionResult(recognitionStatus: RecognitionStatus): ResultReason;
    static implTranslateCancelResult(recognitionStatus: RecognitionStatus): CancellationReason;
    static implTranslateCancelErrorCode(recognitionStatus: RecognitionStatus): CancellationErrorCode;
    static implTranslateErrorDetails(cancellationErrorCode: CancellationErrorCode): string;
}
