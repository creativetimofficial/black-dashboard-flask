// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Contracts } from "./Contracts";
/**
 * Source Language configuration.
 * @class SourceLanguageConfig
 */
export class SourceLanguageConfig {
    constructor(language, endpointId) {
        Contracts.throwIfNullOrUndefined(language, "language");
        this.privLanguage = language;
        this.privEndpointId = endpointId;
    }
    /**
     * @member SourceLanguageConfig.fromLanguage
     * @function
     * @public
     * @param {string} language language (eg. "en-US") value of config.
     * @param {string?} endpointId endpointId of model bound to given language of config.
     * @return {SourceLanguageConfig} Instance of SourceLanguageConfig
     * @summary Creates an instance of the SourceLanguageConfig with the given language and optional endpointId.
     * Added in version 1.13.0.
     */
    static fromLanguage(language, endpointId) {
        return new SourceLanguageConfig(language, endpointId);
    }
    get language() {
        return this.privLanguage;
    }
    get endpointId() {
        return this.privEndpointId;
    }
}

//# sourceMappingURL=SourceLanguageConfig.js.map
