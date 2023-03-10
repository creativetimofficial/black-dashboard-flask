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
// eslint-disable-next-line max-classes-per-file
import { RecognizerConfig } from "../../common.speech/Exports";
import { BackgroundEvent, Events, Timeout } from "../../common/Exports";
import { Contracts } from "../../sdk/Contracts";
import { Connection, Recognizer } from "../../sdk/Exports";
import { ConversationConnectionFactory } from "./ConversationConnectionFactory";
import { ConversationServiceAdapter } from "./ConversationServiceAdapter";
export class ConversationRecognizerFactory {
    static fromConfig(conversation, speechConfig, audioConfig) {
        return new ConversationTranslatorRecognizer(conversation, speechConfig, audioConfig);
    }
}
/**
 * Sends messages to the Conversation Translator websocket and listens for incoming events containing websocket messages.
 * Based off the recognizers in the SDK folder.
 */
export class ConversationTranslatorRecognizer extends Recognizer {
    constructor(conversation, speechConfig, audioConfig) {
        const serviceConfigImpl = speechConfig;
        Contracts.throwIfNull(serviceConfigImpl, "speechConfig");
        const conversationImpl = conversation;
        Contracts.throwIfNull(conversationImpl, "conversationImpl");
        super(audioConfig, serviceConfigImpl.properties, new ConversationConnectionFactory());
        this.privConversation = conversationImpl;
        this.privIsDisposed = false;
        this.privProperties = serviceConfigImpl.properties.clone();
        this.privConnection = Connection.fromRecognizer(this);
        this.privSetTimeout = (typeof (Blob) !== "undefined" && typeof (Worker) !== "undefined") ? Timeout.setTimeout : setTimeout;
        this.privClearTimeout = (typeof (Blob) !== "undefined" && typeof (Worker) !== "undefined") ? Timeout.clearTimeout : clearTimeout;
    }
    set connected(cb) {
        this.privConnection.connected = cb;
    }
    set disconnected(cb) {
        this.privConnection.disconnected = cb;
    }
    /**
     * Return the speech language used by the recognizer
     */
    get speechRecognitionLanguage() {
        return this.privSpeechRecognitionLanguage;
    }
    /**
     * Return the properties for the recognizer
     */
    get properties() {
        return this.privProperties;
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    /**
     * Connect to the recognizer
     * @param token
     */
    connect(token, cb, err) {
        try {
            Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts.throwIfNullOrWhitespace(token, "token");
            this.privReco.conversationTranslatorToken = token;
            this.resetConversationTimeout();
            this.privReco.connectAsync(cb, err);
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    const typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
        }
    }
    /**
     * Disconnect from the recognizer
     */
    disconnect(cb, err) {
        try {
            Contracts.throwIfDisposed(this.privIsDisposed);
            if (this.privTimeoutToken !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                this.privClearTimeout(this.privTimeoutToken);
            }
            this.privReco.disconnect().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    const typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
            // Destroy the recognizer.
            this.dispose(true).catch((reason) => {
                Events.instance.onEvent(new BackgroundEvent(reason));
            });
        }
    }
    /**
     * Send the mute all participants command to the websocket
     * @param conversationId
     * @param participantId
     * @param isMuted
     */
    sendRequest(command, cb, err) {
        try {
            Contracts.throwIfDisposed(this.privIsDisposed);
            this.sendMessage(command, cb, err);
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    const typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
            // Destroy the recognizer.
            this.dispose(true).catch((reason) => {
                Events.instance.onEvent(new BackgroundEvent(reason));
            });
        }
    }
    /**
     * Close and dispose the recognizer
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.privIsDisposed) {
                if (!!this.privConnection) {
                    this.privConnection.closeConnection();
                    this.privConnection.close();
                }
                this.privConnection = undefined;
                yield this.dispose(true);
            }
        });
    }
    /**
     * Dispose the recognizer
     * @param disposing
     */
    dispose(disposing) {
        const _super = Object.create(null, {
            dispose: { get: () => super.dispose }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privIsDisposed) {
                return;
            }
            if (disposing) {
                if (this.privTimeoutToken !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    this.privClearTimeout(this.privTimeoutToken);
                }
                this.privIsDisposed = true;
                if (!!this.privConnection) {
                    this.privConnection.closeConnection();
                    this.privConnection.close();
                    this.privConnection = undefined;
                }
                yield _super.dispose.call(this, disposing);
            }
        });
    }
    /**
     * Create the config for the recognizer
     * @param speechConfig
     */
    createRecognizerConfig(speechConfig) {
        return new RecognizerConfig(speechConfig, this.privProperties);
    }
    /**
     * Create the service recognizer.
     * The audio source is redundnant here but is required by the implementation.
     * @param authentication
     * @param connectionFactory
     * @param audioConfig
     * @param recognizerConfig
     */
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const audioSource = audioConfig;
        return new ConversationServiceAdapter(authentication, connectionFactory, audioSource, recognizerConfig, this);
    }
    sendMessage(msg, cb, err) {
        const withAsync = this.privReco;
        const PromiseToEmptyCallback = (promise, cb, err) => {
            if (promise !== undefined) {
                promise.then(() => {
                    try {
                        if (!!cb) {
                            cb();
                        }
                    }
                    catch (e) {
                        if (!!err) {
                            err(`'Unhandled error on promise callback: ${e}'`);
                        }
                    }
                }, (reason) => {
                    try {
                        if (!!err) {
                            err(reason);
                        }
                        // eslint-disable-next-line no-empty
                    }
                    catch (error) { }
                });
            }
            else {
                if (!!err) {
                    err("Null promise");
                }
            }
        };
        PromiseToEmptyCallback(withAsync.sendMessageAsync(msg), cb, err);
        this.resetConversationTimeout();
    }
    resetConversationTimeout() {
        if (this.privTimeoutToken !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.privClearTimeout(this.privTimeoutToken);
        }
        this.privTimeoutToken = this.privSetTimeout(() => {
            this.sendRequest(this.privConversation.getKeepAlive());
        }, 60000);
    }
}

//# sourceMappingURL=ConversationTranslatorRecognizer.js.map
