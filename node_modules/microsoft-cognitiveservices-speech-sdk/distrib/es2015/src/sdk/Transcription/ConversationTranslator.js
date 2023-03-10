// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable max-classes-per-file */
import { ConversationConnectionConfig, ServicePropertiesPropertyName, } from "../../common.speech/Exports";
import { ConversationTranslatorConnectionFactory } from "../../common.speech/Transcription/ConversationTranslatorConnectionFactory";
import { marshalPromiseToCallbacks } from "../../common/Exports";
import { Contracts } from "../Contracts";
import { AudioConfig, CancellationErrorCode, CancellationReason, ProfanityOption, PropertyCollection, PropertyId, ServicePropertyChannel, SpeechTranslationConfig, TranslationRecognizer } from "../Exports";
import { ConversationImpl } from "./Conversation";
import { ConversationCommon, ConversationTranslationCanceledEventArgs } from "./Exports";
export var SpeechState;
(function (SpeechState) {
    SpeechState[SpeechState["Inactive"] = 0] = "Inactive";
    SpeechState[SpeechState["Connecting"] = 1] = "Connecting";
    SpeechState[SpeechState["Connected"] = 2] = "Connected";
})(SpeechState || (SpeechState = {}));
// child class of TranslationRecognizer meant only for use with ConversationTranslator
class ConversationTranslationRecognizer extends TranslationRecognizer {
    constructor(speechConfig, audioConfig, translator, convGetter) {
        super(speechConfig, audioConfig, new ConversationTranslatorConnectionFactory(convGetter));
        this.privSpeechState = SpeechState.Inactive;
        if (!!translator) {
            this.privTranslator = translator;
            this.sessionStarted = () => {
                this.privSpeechState = SpeechState.Connected;
            };
            this.sessionStopped = () => {
                this.privSpeechState = SpeechState.Inactive;
            };
            this.recognizing = (tr, e) => {
                if (!!this.privTranslator.recognizing) {
                    this.privTranslator.recognizing(this.privTranslator, e);
                }
            };
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            this.recognized = (tr, e) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // if there is an error connecting to the conversation service from the speech service the error will be returned in the ErrorDetails field.
                if ((_a = e.result) === null || _a === void 0 ? void 0 : _a.errorDetails) {
                    yield this.cancelSpeech();
                    // TODO: format the error message contained in 'errorDetails'
                    this.fireCancelEvent(e.result.errorDetails);
                }
                else {
                    if (!!this.privTranslator.recognized) {
                        this.privTranslator.recognized(this.privTranslator, e);
                    }
                }
                return;
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            this.canceled = () => __awaiter(this, void 0, void 0, function* () {
                if (this.privSpeechState !== SpeechState.Inactive) {
                    try {
                        yield this.cancelSpeech();
                    }
                    catch (error) {
                        this.privSpeechState = SpeechState.Inactive;
                    }
                }
            });
        }
    }
    get state() {
        return this.privSpeechState;
    }
    set state(newState) {
        this.privSpeechState = newState;
    }
    onConnection() {
        this.privSpeechState = SpeechState.Connected;
    }
    onDisconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.privSpeechState = SpeechState.Inactive;
            yield this.cancelSpeech();
        });
    }
    /**
     * Fire a cancel event
     * @param error
     */
    fireCancelEvent(error) {
        try {
            if (!!this.privTranslator.canceled) {
                const cancelEvent = new ConversationTranslationCanceledEventArgs(CancellationReason.Error, error, CancellationErrorCode.RuntimeError);
                this.privTranslator.canceled(this.privTranslator, cancelEvent);
            }
        }
        catch (e) {
            //
        }
    }
    cancelSpeech() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.stopContinuousRecognitionAsync();
                yield ((_a = this.privReco) === null || _a === void 0 ? void 0 : _a.disconnect());
                this.privSpeechState = SpeechState.Inactive;
            }
            catch (e) {
                // ignore the error
            }
        });
    }
}
/**
 * Join, leave or connect to a conversation.
 */
export class ConversationTranslator extends ConversationCommon {
    constructor(audioConfig) {
        super(audioConfig);
        this.privErrors = ConversationConnectionConfig.restErrors;
        this.privIsDisposed = false;
        this.privIsSpeaking = false;
        this.privPlaceholderKey = "abcdefghijklmnopqrstuvwxyz012345";
        this.privPlaceholderRegion = "westus";
        this.privProperties = new PropertyCollection();
    }
    get properties() {
        return this.privProperties;
    }
    get speechRecognitionLanguage() {
        return this.privSpeechRecognitionLanguage;
    }
    get participants() {
        var _a;
        return (_a = this.privConversation) === null || _a === void 0 ? void 0 : _a.participants;
    }
    get canSpeak() {
        // is there a Conversation websocket available and has the Recognizer been set up
        if (!this.privConversation.isConnected || !this.privCTRecognizer) {
            return false;
        }
        // is the user already speaking
        if (this.privIsSpeaking || this.privCTRecognizer.state === SpeechState.Connected || this.privCTRecognizer.state === SpeechState.Connecting) {
            return false;
        }
        // is the user muted
        if (this.privConversation.isMutedByHost) {
            return false;
        }
        return true;
    }
    setServiceProperty(name, value) {
        const currentProperties = JSON.parse(this.privProperties.getProperty(ServicePropertiesPropertyName, "{}"));
        currentProperties[name] = value;
        this.privProperties.setProperty(ServicePropertiesPropertyName, JSON.stringify(currentProperties));
    }
    joinConversationAsync(conversation, nickname, param1, param2, param3) {
        try {
            if (typeof conversation === "string") {
                Contracts.throwIfNullOrUndefined(conversation, this.privErrors.invalidArgs.replace("{arg}", "conversation id"));
                Contracts.throwIfNullOrWhitespace(nickname, this.privErrors.invalidArgs.replace("{arg}", "nickname"));
                if (!!this.privConversation) {
                    this.handleError(new Error(this.privErrors.permissionDeniedStart), param3);
                }
                let lang = param1;
                if (lang === undefined || lang === null || lang === "") {
                    lang = ConversationConnectionConfig.defaultLanguageCode;
                }
                // create a placeholder config
                this.privSpeechTranslationConfig = SpeechTranslationConfig.fromSubscription(this.privPlaceholderKey, this.privPlaceholderRegion);
                this.privSpeechTranslationConfig.setProfanity(ProfanityOption.Masked);
                this.privSpeechTranslationConfig.addTargetLanguage(lang);
                this.privSpeechTranslationConfig.setProperty(PropertyId[PropertyId.SpeechServiceConnection_RecoLanguage], lang);
                this.privSpeechTranslationConfig.setProperty(PropertyId[PropertyId.ConversationTranslator_Name], nickname);
                const propertyIdsToCopy = [
                    PropertyId.SpeechServiceConnection_Host,
                    PropertyId.ConversationTranslator_Host,
                    PropertyId.SpeechServiceConnection_Endpoint,
                    PropertyId.SpeechServiceConnection_ProxyHostName,
                    PropertyId.SpeechServiceConnection_ProxyPassword,
                    PropertyId.SpeechServiceConnection_ProxyPort,
                    PropertyId.SpeechServiceConnection_ProxyUserName,
                    "ConversationTranslator_MultiChannelAudio",
                    "ConversationTranslator_Region"
                ];
                for (const prop of propertyIdsToCopy) {
                    const value = this.privProperties.getProperty(prop);
                    if (value) {
                        const key = typeof prop === "string" ? prop : PropertyId[prop];
                        this.privSpeechTranslationConfig.setProperty(key, value);
                    }
                }
                const currentProperties = JSON.parse(this.privProperties.getProperty(ServicePropertiesPropertyName, "{}"));
                for (const prop of Object.keys(currentProperties)) {
                    this.privSpeechTranslationConfig.setServiceProperty(prop, currentProperties[prop], ServicePropertyChannel.UriQueryParameter);
                }
                // join the conversation
                this.privConversation = new ConversationImpl(this.privSpeechTranslationConfig);
                this.privConversation.conversationTranslator = this;
                this.privConversation.joinConversationAsync(conversation, nickname, lang, ((result) => {
                    if (!result) {
                        this.handleError(new Error(this.privErrors.permissionDeniedConnect), param3);
                    }
                    this.privSpeechTranslationConfig.authorizationToken = result;
                    this.privConversation.room.isHost = false;
                    // connect to the ws
                    this.privConversation.startConversationAsync((() => {
                        this.handleCallback(param2, param3);
                    }), ((error) => {
                        this.handleError(error, param3);
                    }));
                }), ((error) => {
                    this.handleError(error, param3);
                }));
            }
            else if (typeof conversation === "object") {
                Contracts.throwIfNullOrUndefined(conversation, this.privErrors.invalidArgs.replace("{arg}", "conversation id"));
                Contracts.throwIfNullOrWhitespace(nickname, this.privErrors.invalidArgs.replace("{arg}", "nickname"));
                // save the nickname
                this.privProperties.setProperty(PropertyId.ConversationTranslator_Name, nickname);
                // ref the conversation object
                this.privConversation = conversation;
                // ref the conversation translator object
                this.privConversation.conversationTranslator = this;
                this.privConversation.room.isHost = true;
                Contracts.throwIfNullOrUndefined(this.privConversation, this.privErrors.permissionDeniedConnect);
                Contracts.throwIfNullOrUndefined(this.privConversation.room.token, this.privErrors.permissionDeniedConnect);
                this.privSpeechTranslationConfig = conversation.config;
                this.handleCallback(param1, param2);
            }
            else {
                this.handleError(new Error(this.privErrors.invalidArgs.replace("{arg}", "invalid conversation type")), param2);
            }
        }
        catch (error) {
            this.handleError(error, typeof param1 === "string" ? param3 : param2);
        }
    }
    /**
     * Leave the conversation
     * @param cb
     * @param err
     */
    leaveConversationAsync(cb, err) {
        marshalPromiseToCallbacks((() => __awaiter(this, void 0, void 0, function* () {
            // stop the speech websocket
            yield this.cancelSpeech();
            // stop the websocket
            yield this.privConversation.endConversationImplAsync();
            // https delete request
            yield this.privConversation.deleteConversationImplAsync();
            this.dispose();
        }))(), cb, err);
    }
    /**
     * Send a text message
     * @param message
     * @param cb
     * @param err
     */
    sendTextMessageAsync(message, cb, err) {
        try {
            Contracts.throwIfNullOrUndefined(this.privConversation, this.privErrors.permissionDeniedSend);
            Contracts.throwIfNullOrWhitespace(message, this.privErrors.invalidArgs.replace("{arg}", message));
            this.privConversation.sendTextMessageAsync(message, cb, err);
        }
        catch (error) {
            this.handleError(error, err);
        }
    }
    /**
     * Start speaking
     * @param cb
     * @param err
     */
    startTranscribingAsync(cb, err) {
        marshalPromiseToCallbacks((() => __awaiter(this, void 0, void 0, function* () {
            try {
                Contracts.throwIfNullOrUndefined(this.privConversation, this.privErrors.permissionDeniedSend);
                Contracts.throwIfNullOrUndefined(this.privConversation.room.token, this.privErrors.permissionDeniedConnect);
                if (this.privCTRecognizer === undefined) {
                    yield this.connectTranslatorRecognizer();
                }
                Contracts.throwIfNullOrUndefined(this.privCTRecognizer, this.privErrors.permissionDeniedSend);
                if (!this.canSpeak) {
                    this.handleError(new Error(this.privErrors.permissionDeniedSend), err);
                }
                yield this.startContinuousRecognition();
                this.privIsSpeaking = true;
            }
            catch (error) {
                this.privIsSpeaking = false;
                yield this.cancelSpeech();
                throw error;
            }
        }))(), cb, err);
    }
    /**
     * Stop speaking
     * @param cb
     * @param err
     */
    stopTranscribingAsync(cb, err) {
        marshalPromiseToCallbacks((() => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.privIsSpeaking) {
                    // stop speech
                    yield this.cancelSpeech();
                    return;
                }
                // stop the recognition but leave the websocket open
                this.privIsSpeaking = false;
                yield new Promise((resolve, reject) => {
                    this.privCTRecognizer.stopContinuousRecognitionAsync(resolve, reject);
                });
            }
            catch (error) {
                yield this.cancelSpeech();
            }
        }))(), cb, err);
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    dispose(reason, success, err) {
        marshalPromiseToCallbacks((() => __awaiter(this, void 0, void 0, function* () {
            if (this.isDisposed && !this.privIsSpeaking) {
                return;
            }
            yield this.cancelSpeech();
            this.privIsDisposed = true;
            this.privSpeechTranslationConfig.close();
            this.privSpeechRecognitionLanguage = undefined;
            this.privProperties = undefined;
            this.privAudioConfig = undefined;
            this.privSpeechTranslationConfig = undefined;
            this.privConversation.dispose();
            this.privConversation = undefined;
        }))(), success, err);
    }
    /**
     * Cancel the speech websocket
     */
    cancelSpeech() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.privIsSpeaking = false;
                yield ((_a = this.privCTRecognizer) === null || _a === void 0 ? void 0 : _a.onDisconnection());
                this.privCTRecognizer = undefined;
            }
            catch (e) {
                // ignore the error
            }
        });
    }
    /**
     * Connect to the speech translation recognizer.
     * Currently there is no language validation performed before sending the SpeechLanguage code to the service.
     * If it's an invalid language the raw error will be: 'Error during WebSocket handshake: Unexpected response code: 400'
     * e.g. pass in 'fr' instead of 'fr-FR', or a text-only language 'cy'
     */
    connectTranslatorRecognizer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.privAudioConfig === undefined) {
                    this.privAudioConfig = AudioConfig.fromDefaultMicrophoneInput();
                }
                // clear the temp subscription key if it's a participant joining
                if (this.privSpeechTranslationConfig.getProperty(PropertyId[PropertyId.SpeechServiceConnection_Key])
                    === this.privPlaceholderKey) {
                    this.privSpeechTranslationConfig.setProperty(PropertyId[PropertyId.SpeechServiceConnection_Key], "");
                }
                const convGetter = () => this.privConversation;
                this.privCTRecognizer = new ConversationTranslationRecognizer(this.privSpeechTranslationConfig, this.privAudioConfig, this, convGetter);
            }
            catch (error) {
                yield this.cancelSpeech();
                throw error;
            }
        });
    }
    /**
     * Handle the start speaking request
     */
    startContinuousRecognition() {
        return new Promise((resolve, reject) => {
            this.privCTRecognizer.startContinuousRecognitionAsync(resolve, reject);
        });
    }
}

//# sourceMappingURL=ConversationTranslator.js.map
