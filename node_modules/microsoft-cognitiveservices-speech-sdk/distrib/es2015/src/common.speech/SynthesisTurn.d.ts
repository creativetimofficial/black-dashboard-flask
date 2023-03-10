import { IAudioDestination } from "../common/Exports";
import { AudioOutputFormatImpl } from "../sdk/Audio/AudioOutputFormat";
import { ISynthesisMetadata } from "./ServiceMessages/SynthesisAudioMetadata";
import { SpeechSynthesisEvent } from "./SynthesisEvents";
export interface ISynthesisResponseContext {
    serviceTag: string;
}
export interface ISynthesisResponseAudio {
    type: string;
    streamId: string;
}
export interface ISynthesisResponse {
    context: ISynthesisResponseContext;
    audio: ISynthesisResponseAudio;
}
export declare class SynthesisTurn {
    get requestId(): string;
    get streamId(): string;
    set streamId(value: string);
    get audioOutputFormat(): AudioOutputFormatImpl;
    set audioOutputFormat(format: AudioOutputFormatImpl);
    get turnCompletionPromise(): Promise<void>;
    get isSynthesisEnded(): boolean;
    get isSynthesizing(): boolean;
    get currentTextOffset(): number;
    get currentSentenceOffset(): number;
    get bytesReceived(): number;
    get audioDuration(): number;
    private privIsDisposed;
    private privAuthFetchEventId;
    private privIsSynthesizing;
    private privIsSynthesisEnded;
    private privBytesReceived;
    private privRequestId;
    private privStreamId;
    private privTurnDeferral;
    private privInTurn;
    private privAudioOutputFormat;
    private privAudioOutputStream;
    private privReceivedAudio;
    private privReceivedAudioWithHeader;
    private privTextOffset;
    private privNextSearchTextIndex;
    private privSentenceOffset;
    private privNextSearchSentenceIndex;
    private privPartialVisemeAnimation;
    private privRawText;
    private privIsSSML;
    private privTurnAudioDestination;
    private privAudioDuration;
    constructor();
    getAllReceivedAudio(): Promise<ArrayBuffer>;
    getAllReceivedAudioWithHeader(): Promise<ArrayBuffer>;
    startNewSynthesis(requestId: string, rawText: string, isSSML: boolean, audioDestination?: IAudioDestination): void;
    onPreConnectionStart(authFetchEventId: string): void;
    onAuthCompleted(isError: boolean): void;
    onConnectionEstablishCompleted(statusCode: number): void;
    onServiceResponseMessage(responseJson: string): void;
    onServiceTurnEndResponse(): void;
    onServiceTurnStartResponse(): void;
    onAudioChunkReceived(data: ArrayBuffer): void;
    onTextBoundaryEvent(metadata: ISynthesisMetadata): void;
    onVisemeMetadataReceived(metadata: ISynthesisMetadata): void;
    onSessionEnd(metadata: ISynthesisMetadata): void;
    dispose(): void;
    onStopSynthesizing(): void;
    /**
     * Gets the viseme animation string (merged from animation chunk), and clears the internal
     * partial animation.
     */
    getAndClearVisemeAnimation(): string;
    protected onEvent(event: SpeechSynthesisEvent): void;
    /**
     * Check if the text is an XML(SSML) tag
     * @param text
     * @private
     */
    private static isXmlTag;
    private updateTextOffset;
    private onComplete;
    private readAllAudioFromStream;
    /**
     * Check if current idx is in XML(SSML) tag
     * @param idx
     * @private
     */
    private withinXmlTag;
}
