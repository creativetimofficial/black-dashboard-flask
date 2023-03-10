"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesizerConfig = exports.SynthesisServiceType = void 0;
var Exports_1 = require("./Exports");
var SynthesisServiceType;
(function (SynthesisServiceType) {
    SynthesisServiceType[SynthesisServiceType["Standard"] = 0] = "Standard";
    SynthesisServiceType[SynthesisServiceType["Custom"] = 1] = "Custom";
})(SynthesisServiceType = exports.SynthesisServiceType || (exports.SynthesisServiceType = {}));
var SynthesizerConfig = /** @class */ (function () {
    function SynthesizerConfig(speechServiceConfig, parameters) {
        this.privSynthesisServiceType = SynthesisServiceType.Standard;
        this.privSpeechServiceConfig = speechServiceConfig ? speechServiceConfig : new Exports_1.SpeechServiceConfig(new Exports_1.Context(null));
        this.privParameters = parameters;
    }
    Object.defineProperty(SynthesizerConfig.prototype, "parameters", {
        get: function () {
            return this.privParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesizerConfig.prototype, "synthesisServiceType", {
        get: function () {
            return this.privSynthesisServiceType;
        },
        set: function (value) {
            this.privSynthesisServiceType = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesizerConfig.prototype, "SpeechServiceConfig", {
        get: function () {
            return this.privSpeechServiceConfig;
        },
        enumerable: false,
        configurable: true
    });
    return SynthesizerConfig;
}());
exports.SynthesizerConfig = SynthesizerConfig;

//# sourceMappingURL=SynthesizerConfig.js.map
