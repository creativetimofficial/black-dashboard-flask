// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { ForceDictationPropertyName, OutputFormatPropertyName, ServicePropertiesPropertyName } from "../common.speech/Exports";
import { Contracts } from "./Contracts";
import { OutputFormat, ProfanityOption, PropertyCollection, PropertyId, SpeechSynthesisOutputFormat, } from "./Exports";
/**
 * Speech configuration.
 * @class SpeechConfig
 */
export class SpeechConfig {
    /**
     * Creates and initializes an instance.
     * @constructor
     */
    constructor() {
        return;
    }
    /**
     * Static instance of SpeechConfig returned by passing subscriptionKey and service region.
     * Note: Please use your LanguageUnderstanding subscription key in case you want to use the Intent recognizer.
     * @member SpeechConfig.fromSubscription
     * @function
     * @public
     * @param {string} subscriptionKey - The subscription key.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechConfig} The speech factory
     */
    static fromSubscription(subscriptionKey, region) {
        Contracts.throwIfNullOrWhitespace(subscriptionKey, "subscriptionKey");
        Contracts.throwIfNullOrWhitespace(region, "region");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_Region, region);
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_IntentRegion, region);
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        return speechImpl;
    }
    /**
     * Creates an instance of the speech config with specified endpoint and subscription key.
     * This method is intended only for users who use a non-standard service endpoint or parameters.
     * Note: Please use your LanguageUnderstanding subscription key in case you want to use the Intent recognizer.
     * Note: The query parameters specified in the endpoint URL are not changed, even if they are set by any other APIs.
     * For example, if language is defined in the uri as query parameter "language=de-DE", and also set by
     * SpeechConfig.speechRecognitionLanguage = "en-US", the language setting in uri takes precedence,
     * and the effective language is "de-DE". Only the parameters that are not specified in the
     * endpoint URL can be set by other APIs.
     * Note: To use authorization token with fromEndpoint, pass an empty string to the subscriptionKey in the
     * fromEndpoint method, and then set authorizationToken="token" on the created SpeechConfig instance to
     * use the authorization token.
     * @member SpeechConfig.fromEndpoint
     * @function
     * @public
     * @param {URL} endpoint - The service endpoint to connect to.
     * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
     * @returns {SpeechConfig} A speech factory instance.
     */
    static fromEndpoint(endpoint, subscriptionKey) {
        Contracts.throwIfNull(endpoint, "endpoint");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_Endpoint, endpoint.href);
        if (undefined !== subscriptionKey) {
            speechImpl.setProperty(PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        }
        return speechImpl;
    }
    /**
     * Creates an instance of the speech config with specified host and subscription key.
     * This method is intended only for users who use a non-default service host. Standard resource path will be assumed.
     * For services with a non-standard resource path or no path at all, use fromEndpoint instead.
     * Note: Query parameters are not allowed in the host URI and must be set by other APIs.
     * Note: To use an authorization token with fromHost, use fromHost(URL),
     * and then set the AuthorizationToken property on the created SpeechConfig instance.
     * Note: Added in version 1.9.0.
     * @member SpeechConfig.fromHost
     * @function
     * @public
     * @param {URL} host - The service endpoint to connect to. Format is "protocol://host:port" where ":port" is optional.
     * @param {string} subscriptionKey - The subscription key. If a subscription key is not specified, an authorization token must be set.
     * @returns {SpeechConfig} A speech factory instance.
     */
    static fromHost(hostName, subscriptionKey) {
        Contracts.throwIfNull(hostName, "hostName");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_Host, hostName.protocol + "//" + hostName.hostname + (hostName.port === "" ? "" : ":" + hostName.port));
        if (undefined !== subscriptionKey) {
            speechImpl.setProperty(PropertyId.SpeechServiceConnection_Key, subscriptionKey);
        }
        return speechImpl;
    }
    /**
     * Creates an instance of the speech factory with specified initial authorization token and region.
     * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
     * expires, the caller needs to refresh it by calling this setter with a new valid token.
     * Note: Please use a token derived from your LanguageUnderstanding subscription key in case you want
     * to use the Intent recognizer. As configuration values are copied when creating a new recognizer,
     * the new token value will not apply to recognizers that have already been created. For recognizers
     * that have been created before, you need to set authorization token of the corresponding recognizer
     * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
     * @member SpeechConfig.fromAuthorizationToken
     * @function
     * @public
     * @param {string} authorizationToken - The initial authorization token.
     * @param {string} region - The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {SpeechConfig} A speech factory instance.
     */
    static fromAuthorizationToken(authorizationToken, region) {
        Contracts.throwIfNull(authorizationToken, "authorizationToken");
        Contracts.throwIfNullOrWhitespace(region, "region");
        const speechImpl = new SpeechConfigImpl();
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_Region, region);
        speechImpl.setProperty(PropertyId.SpeechServiceConnection_IntentRegion, region);
        speechImpl.authorizationToken = authorizationToken;
        return speechImpl;
    }
    /**
     * Closes the configuration.
     * @member SpeechConfig.prototype.close
     * @function
     * @public
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close() { }
}
/**
 * @public
 * @class SpeechConfigImpl
 */
export class SpeechConfigImpl extends SpeechConfig {
    constructor() {
        super();
        this.privProperties = new PropertyCollection();
        this.speechRecognitionLanguage = "en-US"; // Should we have a default?
        this.outputFormat = OutputFormat.Simple;
    }
    get properties() {
        return this.privProperties;
    }
    get endPoint() {
        return new URL(this.privProperties.getProperty(PropertyId.SpeechServiceConnection_Endpoint));
    }
    get subscriptionKey() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_Key);
    }
    get region() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_Region);
    }
    get authorizationToken() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceAuthorization_Token);
    }
    set authorizationToken(value) {
        this.privProperties.setProperty(PropertyId.SpeechServiceAuthorization_Token, value);
    }
    get speechRecognitionLanguage() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage);
    }
    set speechRecognitionLanguage(value) {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_RecoLanguage, value);
    }
    get autoDetectSourceLanguages() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages);
    }
    set autoDetectSourceLanguages(value) {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, value);
    }
    get outputFormat() {
        return OutputFormat[this.privProperties.getProperty(OutputFormatPropertyName, undefined)];
    }
    set outputFormat(value) {
        this.privProperties.setProperty(OutputFormatPropertyName, OutputFormat[value]);
    }
    get endpointId() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_EndpointId);
    }
    set endpointId(value) {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_EndpointId, value);
    }
    setProperty(name, value) {
        Contracts.throwIfNull(value, "value");
        this.privProperties.setProperty(name, value);
    }
    getProperty(name, def) {
        return this.privProperties.getProperty(name, def);
    }
    setProxy(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.setProperty(PropertyId[PropertyId.SpeechServiceConnection_ProxyHostName], proxyHostName);
        this.setProperty(PropertyId[PropertyId.SpeechServiceConnection_ProxyPort], proxyPort);
        this.setProperty(PropertyId[PropertyId.SpeechServiceConnection_ProxyUserName], proxyUserName);
        this.setProperty(PropertyId[PropertyId.SpeechServiceConnection_ProxyPassword], proxyPassword);
    }
    setServiceProperty(name, value) {
        const currentProperties = JSON.parse(this.privProperties.getProperty(ServicePropertiesPropertyName, "{}"));
        currentProperties[name] = value;
        this.privProperties.setProperty(ServicePropertiesPropertyName, JSON.stringify(currentProperties));
    }
    setProfanity(profanity) {
        this.privProperties.setProperty(PropertyId.SpeechServiceResponse_ProfanityOption, ProfanityOption[profanity]);
    }
    enableAudioLogging() {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_EnableAudioLogging, "true");
    }
    requestWordLevelTimestamps() {
        this.privProperties.setProperty(PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, "true");
    }
    enableDictation() {
        this.privProperties.setProperty(ForceDictationPropertyName, "true");
    }
    clone() {
        const ret = new SpeechConfigImpl();
        ret.privProperties = this.privProperties.clone();
        return ret;
    }
    get speechSynthesisLanguage() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_SynthLanguage);
    }
    set speechSynthesisLanguage(language) {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_SynthLanguage, language);
    }
    get speechSynthesisVoiceName() {
        return this.privProperties.getProperty(PropertyId.SpeechServiceConnection_SynthVoice);
    }
    set speechSynthesisVoiceName(voice) {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_SynthVoice, voice);
    }
    get speechSynthesisOutputFormat() {
        return SpeechSynthesisOutputFormat[this.privProperties.getProperty(PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)];
    }
    set speechSynthesisOutputFormat(format) {
        this.privProperties.setProperty(PropertyId.SpeechServiceConnection_SynthOutputFormat, SpeechSynthesisOutputFormat[format]);
    }
}

//# sourceMappingURL=SpeechConfig.js.map
