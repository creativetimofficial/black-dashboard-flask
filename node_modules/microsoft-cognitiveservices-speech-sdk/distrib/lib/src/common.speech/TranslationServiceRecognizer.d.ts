import { IAudioSource } from "../common/Exports";
import { CancellationErrorCode, CancellationReason, SpeechRecognitionResult, TranslationRecognizer } from "../sdk/Exports";
import { ConversationServiceRecognizer } from "./Exports";
import { IAuthentication } from "./IAuthentication";
import { IConnectionFactory } from "./IConnectionFactory";
import { RecognizerConfig } from "./RecognizerConfig";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";
export declare class TranslationServiceRecognizer extends ConversationServiceRecognizer {
    private privTranslationRecognizer;
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, translationRecognizer: TranslationRecognizer);
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    protected handleRecognizingCallback(result: SpeechRecognitionResult, duration: number, sessionId: string): void;
    protected handleRecognizedCallback(result: SpeechRecognitionResult, offset: number, sessionId: string): void;
    private fireEventForResult;
    private sendSynthesisAudio;
}
