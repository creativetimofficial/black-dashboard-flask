// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ArgumentNullError, ConnectionState, createNoDashGuid, EventSource, MessageType, ServiceEvent, } from "../common/Exports";
import { CancellationErrorCode, CancellationReason, PropertyCollection, PropertyId, ResultReason, SpeechSynthesisBookmarkEventArgs, SpeechSynthesisEventArgs, SpeechSynthesisResult, SpeechSynthesisVisemeEventArgs, SpeechSynthesisWordBoundaryEventArgs, } from "../sdk/Exports";
import { AgentConfig, CancellationErrorCodePropertyName, MetadataType, SynthesisAudioMetadata, SynthesisContext, SynthesisTurn } from "./Exports";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";
export class SynthesisAdapterBase {
    constructor(authentication, connectionFactory, synthesizerConfig, speechSynthesizer, audioDestination) {
        this.speakOverride = undefined;
        this.receiveMessageOverride = undefined;
        this.connectImplOverride = undefined;
        this.configConnectionOverride = undefined;
        // A promise for a configured connection.
        // Do not consume directly, call fetchConnection instead.
        this.privConnectionConfigurationPromise = undefined;
        if (!authentication) {
            throw new ArgumentNullError("authentication");
        }
        if (!connectionFactory) {
            throw new ArgumentNullError("connectionFactory");
        }
        if (!synthesizerConfig) {
            throw new ArgumentNullError("synthesizerConfig");
        }
        this.privAuthentication = authentication;
        this.privConnectionFactory = connectionFactory;
        this.privSynthesizerConfig = synthesizerConfig;
        this.privIsDisposed = false;
        this.privSpeechSynthesizer = speechSynthesizer;
        this.privSessionAudioDestination = audioDestination;
        this.privSynthesisTurn = new SynthesisTurn();
        this.privConnectionEvents = new EventSource();
        this.privServiceEvents = new EventSource();
        this.privSynthesisContext = new SynthesisContext(this.privSpeechSynthesizer);
        this.privAgentConfig = new AgentConfig();
        this.connectionEvents.attach((connectionEvent) => {
            if (connectionEvent.name === "ConnectionClosedEvent") {
                const connectionClosedEvent = connectionEvent;
                if (connectionClosedEvent.statusCode !== 1000) {
                    this.cancelSynthesisLocal(CancellationReason.Error, connectionClosedEvent.statusCode === 1007 ? CancellationErrorCode.BadRequestParameters : CancellationErrorCode.ConnectionFailure, `${connectionClosedEvent.reason} websocket error code: ${connectionClosedEvent.statusCode}`);
                }
            }
        });
    }
    get synthesisContext() {
        return this.privSynthesisContext;
    }
    get agentConfig() {
        return this.privAgentConfig;
    }
    get connectionEvents() {
        return this.privConnectionEvents;
    }
    get serviceEvents() {
        return this.privServiceEvents;
    }
    set activityTemplate(messagePayload) {
        this.privActivityTemplate = messagePayload;
    }
    get activityTemplate() {
        return this.privActivityTemplate;
    }
    set audioOutputFormat(format) {
        this.privAudioOutputFormat = format;
        this.privSynthesisTurn.audioOutputFormat = format;
        if (this.privSessionAudioDestination !== undefined) {
            this.privSessionAudioDestination.format = format;
        }
        if (this.synthesisContext !== undefined) {
            this.synthesisContext.audioOutputFormat = format;
        }
    }
    static addHeader(audio, format) {
        if (!format.hasHeader) {
            return audio;
        }
        format.updateHeader(audio.byteLength);
        const tmp = new Uint8Array(audio.byteLength + format.header.byteLength);
        tmp.set(new Uint8Array(format.header), 0);
        tmp.set(new Uint8Array(audio), format.header.byteLength);
        return tmp.buffer;
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    dispose(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            this.privIsDisposed = true;
            if (this.privSessionAudioDestination !== undefined) {
                this.privSessionAudioDestination.close();
            }
            if (this.privConnectionConfigurationPromise !== undefined) {
                const connection = yield this.privConnectionConfigurationPromise;
                yield connection.dispose(reason);
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectImpl();
        });
    }
    sendNetworkMessage(path, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = typeof payload === "string" ? MessageType.Text : MessageType.Binary;
            const contentType = typeof payload === "string" ? "application/json" : "";
            const connection = yield this.fetchConnection();
            return connection.send(new SpeechConnectionMessage(type, path, this.privSynthesisTurn.requestId, contentType, payload));
        });
    }
    Speak(text, isSSML, requestId, successCallback, errorCallBack, audioDestination) {
        return __awaiter(this, void 0, void 0, function* () {
            let ssml;
            if (isSSML) {
                ssml = text;
            }
            else {
                ssml = this.privSpeechSynthesizer.buildSsml(text);
            }
            if (this.speakOverride !== undefined) {
                return this.speakOverride(ssml, requestId, successCallback, errorCallBack);
            }
            this.privSuccessCallback = successCallback;
            this.privErrorCallback = errorCallBack;
            this.privSynthesisTurn.startNewSynthesis(requestId, text, isSSML, audioDestination);
            try {
                yield this.connectImpl();
                const connection = yield this.fetchConnection();
                yield this.sendSynthesisContext(connection);
                yield this.sendSsmlMessage(connection, ssml, requestId);
                const synthesisStartEventArgs = new SpeechSynthesisEventArgs(new SpeechSynthesisResult(requestId, ResultReason.SynthesizingAudioStarted));
                if (!!this.privSpeechSynthesizer.synthesisStarted) {
                    this.privSpeechSynthesizer.synthesisStarted(this.privSpeechSynthesizer, synthesisStartEventArgs);
                }
                void this.receiveMessage();
            }
            catch (e) {
                this.cancelSynthesisLocal(CancellationReason.Error, CancellationErrorCode.ConnectionFailure, e);
                return Promise.reject(e);
            }
        });
    }
    // Cancels synthesis.
    cancelSynthesis(requestId, cancellationReason, errorCode, error) {
        const properties = new PropertyCollection();
        properties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[errorCode]);
        const result = new SpeechSynthesisResult(requestId, ResultReason.Canceled, undefined, error, properties);
        if (!!this.privSpeechSynthesizer.SynthesisCanceled) {
            const cancelEvent = new SpeechSynthesisEventArgs(result);
            try {
                this.privSpeechSynthesizer.SynthesisCanceled(this.privSpeechSynthesizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch (_a) { }
        }
        if (!!this.privSuccessCallback) {
            try {
                this.privSuccessCallback(result);
                /* eslint-disable no-empty */
            }
            catch (_b) { }
        }
    }
    // Cancels synthesis.
    cancelSynthesisLocal(cancellationReason, errorCode, error) {
        if (!!this.privSynthesisTurn.isSynthesizing) {
            this.privSynthesisTurn.onStopSynthesizing();
            this.cancelSynthesis(this.privSynthesisTurn.requestId, cancellationReason, errorCode, error);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processTypeSpecificMessages(connectionMessage) {
        return true;
    }
    receiveMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.fetchConnection();
                const message = yield connection.read();
                if (this.receiveMessageOverride !== undefined) {
                    return this.receiveMessageOverride();
                }
                if (this.privIsDisposed) {
                    // We're done.
                    return;
                }
                // indicates we are draining the queue and it came with no message;
                if (!message) {
                    if (!this.privSynthesisTurn.isSynthesizing) {
                        return;
                    }
                    else {
                        return this.receiveMessage();
                    }
                }
                const connectionMessage = SpeechConnectionMessage.fromConnectionMessage(message);
                if (connectionMessage.requestId.toLowerCase() === this.privSynthesisTurn.requestId.toLowerCase()) {
                    switch (connectionMessage.path.toLowerCase()) {
                        case "turn.start":
                            this.privSynthesisTurn.onServiceTurnStartResponse();
                            break;
                        case "response":
                            this.privSynthesisTurn.onServiceResponseMessage(connectionMessage.textBody);
                            break;
                        case "audio":
                            if (this.privSynthesisTurn.streamId.toLowerCase() === connectionMessage.streamId.toLowerCase()
                                && !!connectionMessage.binaryBody) {
                                this.privSynthesisTurn.onAudioChunkReceived(connectionMessage.binaryBody);
                                if (!!this.privSpeechSynthesizer.synthesizing) {
                                    try {
                                        const audioWithHeader = SynthesisAdapterBase.addHeader(connectionMessage.binaryBody, this.privSynthesisTurn.audioOutputFormat);
                                        const ev = new SpeechSynthesisEventArgs(new SpeechSynthesisResult(this.privSynthesisTurn.requestId, ResultReason.SynthesizingAudio, audioWithHeader));
                                        this.privSpeechSynthesizer.synthesizing(this.privSpeechSynthesizer, ev);
                                    }
                                    catch (error) {
                                        // Not going to let errors in the event handler
                                        // trip things up.
                                    }
                                }
                                if (this.privSessionAudioDestination !== undefined) {
                                    this.privSessionAudioDestination.write(connectionMessage.binaryBody);
                                }
                            }
                            break;
                        case "audio.metadata":
                            const metadataList = SynthesisAudioMetadata.fromJSON(connectionMessage.textBody).Metadata;
                            for (const metadata of metadataList) {
                                switch (metadata.Type) {
                                    case MetadataType.WordBoundary:
                                    case MetadataType.SentenceBoundary:
                                        this.privSynthesisTurn.onTextBoundaryEvent(metadata);
                                        const wordBoundaryEventArgs = new SpeechSynthesisWordBoundaryEventArgs(metadata.Data.Offset, metadata.Data.Duration, metadata.Data.text.Text, metadata.Data.text.Length, metadata.Type === MetadataType.WordBoundary
                                            ? this.privSynthesisTurn.currentTextOffset : this.privSynthesisTurn.currentSentenceOffset, metadata.Data.text.BoundaryType);
                                        if (!!this.privSpeechSynthesizer.wordBoundary) {
                                            try {
                                                this.privSpeechSynthesizer.wordBoundary(this.privSpeechSynthesizer, wordBoundaryEventArgs);
                                            }
                                            catch (error) {
                                                // Not going to let errors in the event handler
                                                // trip things up.
                                            }
                                        }
                                        break;
                                    case MetadataType.Bookmark:
                                        const bookmarkEventArgs = new SpeechSynthesisBookmarkEventArgs(metadata.Data.Offset, metadata.Data.Bookmark);
                                        if (!!this.privSpeechSynthesizer.bookmarkReached) {
                                            try {
                                                this.privSpeechSynthesizer.bookmarkReached(this.privSpeechSynthesizer, bookmarkEventArgs);
                                            }
                                            catch (error) {
                                                // Not going to let errors in the event handler
                                                // trip things up.
                                            }
                                        }
                                        break;
                                    case MetadataType.Viseme:
                                        this.privSynthesisTurn.onVisemeMetadataReceived(metadata);
                                        if (metadata.Data.IsLastAnimation) {
                                            const visemeEventArgs = new SpeechSynthesisVisemeEventArgs(metadata.Data.Offset, metadata.Data.VisemeId, this.privSynthesisTurn.getAndClearVisemeAnimation());
                                            if (!!this.privSpeechSynthesizer.visemeReceived) {
                                                try {
                                                    this.privSpeechSynthesizer.visemeReceived(this.privSpeechSynthesizer, visemeEventArgs);
                                                }
                                                catch (error) {
                                                    // Not going to let errors in the event handler
                                                    // trip things up.
                                                }
                                            }
                                        }
                                        break;
                                    case MetadataType.SessionEnd:
                                        this.privSynthesisTurn.onSessionEnd(metadata);
                                        break;
                                }
                            }
                            break;
                        case "turn.end":
                            this.privSynthesisTurn.onServiceTurnEndResponse();
                            let result;
                            try {
                                const audioBuffer = yield this.privSynthesisTurn.getAllReceivedAudioWithHeader();
                                result = new SpeechSynthesisResult(this.privSynthesisTurn.requestId, ResultReason.SynthesizingAudioCompleted, audioBuffer, undefined, undefined, this.privSynthesisTurn.audioDuration);
                                if (!!this.privSuccessCallback) {
                                    this.privSuccessCallback(result);
                                }
                            }
                            catch (error) {
                                if (!!this.privErrorCallback) {
                                    this.privErrorCallback(error);
                                }
                            }
                            if (this.privSpeechSynthesizer.synthesisCompleted) {
                                try {
                                    this.privSpeechSynthesizer.synthesisCompleted(this.privSpeechSynthesizer, new SpeechSynthesisEventArgs(result));
                                }
                                catch (e) {
                                    // Not going to let errors in the event handler
                                    // trip things up.
                                }
                            }
                            break;
                        default:
                            if (!this.processTypeSpecificMessages(connectionMessage)) {
                                // here are some messages that the derived class has not processed, dispatch them to connect class
                                if (!!this.privServiceEvents) {
                                    this.serviceEvents.onEvent(new ServiceEvent(connectionMessage.path.toLowerCase(), connectionMessage.textBody));
                                }
                            }
                    }
                }
                return this.receiveMessage();
            }
            catch (e) {
                // TODO: What goes here?
            }
        });
    }
    sendSynthesisContext(connection) {
        const synthesisContextJson = this.synthesisContext.toJSON();
        if (synthesisContextJson) {
            return connection.send(new SpeechConnectionMessage(MessageType.Text, "synthesis.context", this.privSynthesisTurn.requestId, "application/json", synthesisContextJson));
        }
        return;
    }
    connectImpl(isUnAuthorized = false) {
        if (this.privConnectionPromise != null) {
            return this.privConnectionPromise.then((connection) => {
                if (connection.state() === ConnectionState.Disconnected) {
                    this.privConnectionId = null;
                    this.privConnectionPromise = null;
                    return this.connectImpl();
                }
                return this.privConnectionPromise;
            }, () => {
                this.privConnectionId = null;
                this.privConnectionPromise = null;
                return this.connectImpl();
            });
        }
        this.privAuthFetchEventId = createNoDashGuid();
        this.privConnectionId = createNoDashGuid();
        this.privSynthesisTurn.onPreConnectionStart(this.privAuthFetchEventId);
        const authPromise = isUnAuthorized ? this.privAuthentication.fetchOnExpiry(this.privAuthFetchEventId) : this.privAuthentication.fetch(this.privAuthFetchEventId);
        this.privConnectionPromise = authPromise.then((result) => __awaiter(this, void 0, void 0, function* () {
            this.privSynthesisTurn.onAuthCompleted(false);
            const connection = this.privConnectionFactory.create(this.privSynthesizerConfig, result, this.privConnectionId);
            // Attach to the underlying event. No need to hold onto the detach pointers as in the event the connection goes away,
            // it'll stop sending events.
            connection.events.attach((event) => {
                this.connectionEvents.onEvent(event);
            });
            const response = yield connection.open();
            if (response.statusCode === 200) {
                this.privSynthesisTurn.onConnectionEstablishCompleted(response.statusCode);
                return Promise.resolve(connection);
            }
            else if (response.statusCode === 403 && !isUnAuthorized) {
                return this.connectImpl(true);
            }
            else {
                this.privSynthesisTurn.onConnectionEstablishCompleted(response.statusCode);
                return Promise.reject(`Unable to contact server. StatusCode: ${response.statusCode}, ${this.privSynthesizerConfig.parameters.getProperty(PropertyId.SpeechServiceConnection_Endpoint)} Reason: ${response.reason}`);
            }
        }), (error) => {
            this.privSynthesisTurn.onAuthCompleted(true);
            throw new Error(error);
        });
        // Attach an empty handler to allow the promise to run in the background while
        // other startup events happen. It'll eventually be awaited on.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.privConnectionPromise.catch(() => { });
        return this.privConnectionPromise;
    }
    sendSpeechServiceConfig(connection, SpeechServiceConfigJson) {
        if (SpeechServiceConfigJson) {
            return connection.send(new SpeechConnectionMessage(MessageType.Text, "speech.config", this.privSynthesisTurn.requestId, "application/json", SpeechServiceConfigJson));
        }
    }
    sendSsmlMessage(connection, ssml, requestId) {
        return connection.send(new SpeechConnectionMessage(MessageType.Text, "ssml", requestId, "application/ssml+xml", ssml));
    }
    fetchConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privConnectionConfigurationPromise !== undefined) {
                return this.privConnectionConfigurationPromise.then((connection) => {
                    if (connection.state() === ConnectionState.Disconnected) {
                        this.privConnectionId = null;
                        this.privConnectionConfigurationPromise = undefined;
                        return this.fetchConnection();
                    }
                    return this.privConnectionConfigurationPromise;
                }, () => {
                    this.privConnectionId = null;
                    this.privConnectionConfigurationPromise = undefined;
                    return this.fetchConnection();
                });
            }
            this.privConnectionConfigurationPromise = this.configureConnection();
            return yield this.privConnectionConfigurationPromise;
        });
    }
    // Takes an established websocket connection to the endpoint and sends speech configuration information.
    configureConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.connectImpl();
            if (this.configConnectionOverride !== undefined) {
                return this.configConnectionOverride(connection);
            }
            yield this.sendSpeechServiceConfig(connection, this.privSynthesizerConfig.SpeechServiceConfig.serialize());
            return connection;
        });
    }
}
SynthesisAdapterBase.telemetryDataEnabled = true;

//# sourceMappingURL=SynthesisAdapterBase.js.map
