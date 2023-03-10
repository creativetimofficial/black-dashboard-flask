// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Context, SpeechServiceConfig } from "./Exports";
export var SynthesisServiceType;
(function (SynthesisServiceType) {
    SynthesisServiceType[SynthesisServiceType["Standard"] = 0] = "Standard";
    SynthesisServiceType[SynthesisServiceType["Custom"] = 1] = "Custom";
})(SynthesisServiceType || (SynthesisServiceType = {}));
export class SynthesizerConfig {
    constructor(speechServiceConfig, parameters) {
        this.privSynthesisServiceType = SynthesisServiceType.Standard;
        this.privSpeechServiceConfig = speechServiceConfig ? speechServiceConfig : new SpeechServiceConfig(new Context(null));
        this.privParameters = parameters;
    }
    get parameters() {
        return this.privParameters;
    }
    get synthesisServiceType() {
        return this.privSynthesisServiceType;
    }
    set synthesisServiceType(value) {
        this.privSynthesisServiceType = value;
    }
    get SpeechServiceConfig() {
        return this.privSpeechServiceConfig;
    }
}

//# sourceMappingURL=SynthesizerConfig.js.map
