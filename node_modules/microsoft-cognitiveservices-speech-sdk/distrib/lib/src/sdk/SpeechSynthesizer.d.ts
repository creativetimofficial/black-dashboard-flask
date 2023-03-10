/// <reference types="node" />
import { PathLike } from "fs";
import { IAuthentication, ISynthesisConnectionFactory, SpeechServiceConfig, SynthesisAdapterBase, SynthesisRestAdapter, SynthesizerConfig } from "../common.speech/Exports";
import { IAudioDestination, Queue } from "../common/Exports";
import { AudioConfig, AudioOutputStream, AutoDetectSourceLanguageConfig, PropertyCollection, PushAudioOutputStreamCallback, SpeechConfig, SpeechSynthesisBookmarkEventArgs, SpeechSynthesisEventArgs, SpeechSynthesisResult, SpeechSynthesisVisemeEventArgs, SpeechSynthesisWordBoundaryEventArgs, SynthesisVoicesResult } from "./Exports";
/**
 * Defines the class SpeechSynthesizer for text to speech.
 * Updated in version 1.16.0
 * @class SpeechSynthesizer
 */
export declare class SpeechSynthesizer {
    protected audioConfig: AudioConfig;
    protected privAdapter: SynthesisAdapterBase;
    protected privRestAdapter: SynthesisRestAdapter;
    protected privProperties: PropertyCollection;
    protected synthesisRequestQueue: Queue<SynthesisRequest>;
    /**
     * Defines event handler for synthesis start events.
     * @member SpeechSynthesizer.prototype.synthesisStarted
     * @function
     * @public
     */
    synthesisStarted: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
    /**
     * Defines event handler for synthesizing events.
     * @member SpeechSynthesizer.prototype.synthesizing
     * @function
     * @public
     */
    synthesizing: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
    /**
     * Defines event handler for synthesis completed events.
     * @member SpeechSynthesizer.prototype.synthesisCompleted
     * @function
     * @public
     */
    synthesisCompleted: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
    /**
     * Defines event handler for synthesis cancelled events.
     * @member SpeechSynthesizer.prototype.SynthesisCanceled
     * @function
     * @public
     */
    SynthesisCanceled: (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => void;
    /**
     * Defines event handler for word boundary events
     * @member SpeechSynthesizer.prototype.wordBoundary
     * @function
     * @public
     */
    wordBoundary: (sender: SpeechSynthesizer, event: SpeechSynthesisWordBoundaryEventArgs) => void;
    /**
     * Defines event handler for bookmark reached events
     * Added in version 1.16.0
     * @member SpeechSynthesizer.prototype.bookmarkReached
     * @function
     * @public
     */
    bookmarkReached: (sender: SpeechSynthesizer, event: SpeechSynthesisBookmarkEventArgs) => void;
    /**
     * Defines event handler for viseme received event
     * Added in version 1.16.0
     * @member SpeechSynthesizer.prototype.visemeReceived
     * @function
     * @public
     */
    visemeReceived: (sender: SpeechSynthesizer, event: SpeechSynthesisVisemeEventArgs) => void;
    /**
     * Gets the authorization token used to communicate with the service.
     * @member SpeechSynthesizer.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken(): string;
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member SpeechSynthesizer.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token: string);
    /**
     * The collection of properties and their values defined for this SpeechSynthesizer.
     * @member SpeechSynthesizer.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechSynthesizer.
     */
    get properties(): PropertyCollection;
    /**
     * Indicates if auto detect source language is enabled
     * @member SpeechSynthesizer.prototype.properties
     * @function
     * @public
     * @returns {boolean} if auto detect source language is enabled
     */
    get autoDetectSourceLanguage(): boolean;
    private privDisposed;
    private privConnectionFactory;
    private privSynthesizing;
    /**
     * SpeechSynthesizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer.
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer.
     */
    constructor(speechConfig: SpeechConfig, audioConfig?: AudioConfig);
    /**
     * SpeechSynthesizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this synthesizer
     * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the synthesizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer
     */
    static FromConfig(speechConfig: SpeechConfig, autoDetectSourceLanguageConfig: AutoDetectSourceLanguageConfig, audioConfig?: AudioConfig): SpeechSynthesizer;
    buildSsml(text: string): string;
    /**
     * Executes speech synthesis on plain text.
     * The task returns the synthesis result.
     * @member SpeechSynthesizer.prototype.speakTextAsync
     * @function
     * @public
     * @param text - Text to be synthesized.
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    speakTextAsync(text: string, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, stream?: AudioOutputStream | PushAudioOutputStreamCallback | PathLike): void;
    /**
     * Executes speech synthesis on SSML.
     * The task returns the synthesis result.
     * @member SpeechSynthesizer.prototype.speakSsmlAsync
     * @function
     * @public
     * @param ssml - SSML to be synthesized.
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    speakSsmlAsync(ssml: string, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, stream?: AudioOutputStream | PushAudioOutputStreamCallback | PathLike): void;
    /**
     * Get list of synthesis voices available.
     * The task returns the synthesis voice result.
     * @member SpeechSynthesizer.prototype.getVoicesAsync
     * @function
     * @async
     * @public
     * @param locale - Locale of voices in BCP-47 format; if left empty, get all available voices.
     * @return {Promise<SynthesisVoicesResult>} - Promise of a SynthesisVoicesResult.
     */
    getVoicesAsync(locale?: string): Promise<SynthesisVoicesResult>;
    /**
     * Dispose of associated resources.
     * @member SpeechSynthesizer.prototype.close
     * @function
     * @public
     */
    close(cb?: () => void, err?: (error: string) => void): void;
    /**
     * @Internal
     * Do not use externally, object returned will change without warning or notice.
     */
    get internalData(): object;
    /**
     * This method performs cleanup of resources.
     * The Boolean parameter disposing indicates whether the method is called
     * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
     * Derived classes should override this method to dispose resource if needed.
     * @member SpeechSynthesizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - Flag to request disposal.
     */
    protected dispose(disposing: boolean): Promise<void>;
    protected createSynthesizerConfig(speechConfig: SpeechServiceConfig): SynthesizerConfig;
    protected createSynthesisAdapter(authentication: IAuthentication, connectionFactory: ISynthesisConnectionFactory, audioConfig: AudioConfig, synthesizerConfig: SynthesizerConfig): SynthesisAdapterBase;
    protected implCommonSynthesizeSetup(): void;
    protected speakImpl(text: string, IsSsml: boolean, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, dataStream?: AudioOutputStream | PushAudioOutputStreamCallback | PathLike): void;
    protected getVoices(locale: string): Promise<SynthesisVoicesResult>;
    protected adapterSpeak(): Promise<void>;
    private static XMLEncode;
}
export declare class SynthesisRequest {
    requestId: string;
    text: string;
    isSSML: boolean;
    cb: (e: SpeechSynthesisResult) => void;
    err: (e: string) => void;
    dataStream: IAudioDestination;
    constructor(requestId: string, text: string, isSSML: boolean, cb?: (e: SpeechSynthesisResult) => void, err?: (e: string) => void, dataStream?: IAudioDestination);
}
