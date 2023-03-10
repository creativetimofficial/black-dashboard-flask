import { IAudioSource } from "../common/Exports";
import { CancellationErrorCode, CancellationReason, IntentRecognizer } from "../sdk/Exports";
import { AddedLmIntent, ServiceRecognizerBase } from "./Exports";
import { IAuthentication } from "./IAuthentication";
import { IConnectionFactory } from "./IConnectionFactory";
import { RecognizerConfig } from "./RecognizerConfig";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";
export declare class IntentServiceRecognizer extends ServiceRecognizerBase {
    private privIntentRecognizer;
    private privAddedLmIntents;
    private privIntentDataSent;
    private privUmbrellaIntent;
    private privPendingIntentArgs;
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, recognizer: IntentRecognizer);
    setIntents(addedIntents: {
        [id: string]: AddedLmIntent;
    }, umbrellaIntent: AddedLmIntent): void;
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
}
