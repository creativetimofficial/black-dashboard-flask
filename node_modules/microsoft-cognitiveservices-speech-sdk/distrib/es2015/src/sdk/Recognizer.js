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
import { CognitiveSubscriptionKeyAuthentication, CognitiveTokenAuthentication, Context, OS, ServiceRecognizerBase, SpeechServiceConfig, } from "../common.speech/Exports";
import { Deferred, marshalPromiseToCallbacks } from "../common/Exports";
import { Contracts } from "./Contracts";
import { AudioConfig, PropertyId, } from "./Exports";
/**
 * Defines the base class Recognizer which mainly contains common event handlers.
 * @class Recognizer
 */
export class Recognizer {
    /**
     * Creates and initializes an instance of a Recognizer
     * @constructor
     * @param {AudioConfig} audioInput - An optional audio input stream associated with the recognizer
     */
    constructor(audioConfig, properties, connectionFactory) {
        this.audioConfig = (audioConfig !== undefined) ? audioConfig : AudioConfig.fromDefaultMicrophoneInput();
        this.privDisposed = false;
        this.privProperties = properties.clone();
        this.privConnectionFactory = connectionFactory;
        this.implCommonRecognizerSetup();
    }
    /**
     * Dispose of associated resources.
     * @member Recognizer.prototype.close
     * @function
     * @public
     */
    close(cb, errorCb) {
        Contracts.throwIfDisposed(this.privDisposed);
        marshalPromiseToCallbacks(this.dispose(true), cb, errorCb);
    }
    /**
     * @Internal
     * Internal data member to support fromRecognizer* pattern methods on other classes.
     * Do not use externally, object returned will change without warning or notice.
     */
    get internalData() {
        return this.privReco;
    }
    /**
     * This method performs cleanup of resources.
     * The Boolean parameter disposing indicates whether the method is called
     * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
     * Derived classes should override this method to dispose resource if needed.
     * @member Recognizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - Flag to request disposal.
     */
    dispose(disposing) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privDisposed) {
                return;
            }
            this.privDisposed = true;
            if (disposing) {
                if (this.privReco) {
                    yield this.privReco.audioSource.turnOff();
                    yield this.privReco.dispose();
                }
            }
        });
    }
    /**
     * This method returns the current state of the telemetry setting.
     * @member Recognizer.prototype.telemetryEnabled
     * @function
     * @public
     * @returns true if the telemetry is enabled, false otherwise.
     */
    static get telemetryEnabled() {
        return ServiceRecognizerBase.telemetryDataEnabled;
    }
    /**
     * This method globally enables or disables telemetry.
     * @member Recognizer.prototype.enableTelemetry
     * @function
     * @public
     * @param enabled - Global setting for telemetry collection.
     * If set to true, telemetry information like microphone errors,
     * recognition errors are collected and sent to Microsoft.
     * If set to false, no telemetry is sent to Microsoft.
     */
    static enableTelemetry(enabled) {
        ServiceRecognizerBase.telemetryDataEnabled = enabled;
    }
    // Does the generic recognizer setup that is common across all recognizer types.
    implCommonRecognizerSetup() {
        let osPlatform = (typeof window !== "undefined") ? "Browser" : "Node";
        let osName = "unknown";
        let osVersion = "unknown";
        if (typeof navigator !== "undefined") {
            osPlatform = osPlatform + "/" + navigator.platform;
            osName = navigator.userAgent;
            osVersion = navigator.appVersion;
        }
        const recognizerConfig = this.createRecognizerConfig(new SpeechServiceConfig(new Context(new OS(osPlatform, osName, osVersion))));
        this.privReco = this.createServiceRecognizer(Recognizer.getAuthFromProperties(this.privProperties), this.privConnectionFactory, this.audioConfig, recognizerConfig);
    }
    recognizeOnceAsyncImpl(recognitionMode) {
        return __awaiter(this, void 0, void 0, function* () {
            Contracts.throwIfDisposed(this.privDisposed);
            const ret = new Deferred();
            yield this.implRecognizerStop();
            yield this.privReco.recognize(recognitionMode, ret.resolve, ret.reject);
            const result = yield ret.promise;
            yield this.implRecognizerStop();
            return result;
        });
    }
    startContinuousRecognitionAsyncImpl(recognitionMode) {
        return __awaiter(this, void 0, void 0, function* () {
            Contracts.throwIfDisposed(this.privDisposed);
            yield this.implRecognizerStop();
            yield this.privReco.recognize(recognitionMode, undefined, undefined);
        });
    }
    stopContinuousRecognitionAsyncImpl() {
        return __awaiter(this, void 0, void 0, function* () {
            Contracts.throwIfDisposed(this.privDisposed);
            yield this.implRecognizerStop();
        });
    }
    implRecognizerStop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privReco) {
                yield this.privReco.stopRecognizing();
            }
            return;
        });
    }
    static getAuthFromProperties(properties) {
        const subscriptionKey = properties.getProperty(PropertyId.SpeechServiceConnection_Key, undefined);
        const authentication = (subscriptionKey && subscriptionKey !== "") ?
            new CognitiveSubscriptionKeyAuthentication(subscriptionKey) :
            new CognitiveTokenAuthentication(() => {
                const authorizationToken = properties.getProperty(PropertyId.SpeechServiceAuthorization_Token, undefined);
                return Promise.resolve(authorizationToken);
            }, () => {
                const authorizationToken = properties.getProperty(PropertyId.SpeechServiceAuthorization_Token, undefined);
                return Promise.resolve(authorizationToken);
            });
        return authentication;
    }
}

//# sourceMappingURL=Recognizer.js.map
