"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerRecognitionConfig = void 0;
var Exports_1 = require("./Exports");
var SpeakerRecognitionConfig = /** @class */ (function () {
    function SpeakerRecognitionConfig(context, parameters) {
        this.privContext = context ? context : new Exports_1.Context(null);
        this.privParameters = parameters;
    }
    Object.defineProperty(SpeakerRecognitionConfig.prototype, "parameters", {
        get: function () {
            return this.privParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerRecognitionConfig.prototype, "Context", {
        get: function () {
            return this.privContext;
        },
        enumerable: false,
        configurable: true
    });
    return SpeakerRecognitionConfig;
}());
exports.SpeakerRecognitionConfig = SpeakerRecognitionConfig;

//# sourceMappingURL=SpeakerRecognitionConfig.js.map
