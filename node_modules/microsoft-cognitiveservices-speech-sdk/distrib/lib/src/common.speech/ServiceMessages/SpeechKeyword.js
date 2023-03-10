"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechKeyword = void 0;
var SpeechKeyword = /** @class */ (function () {
    function SpeechKeyword(json) {
        this.privSpeechKeyword = JSON.parse(json);
    }
    SpeechKeyword.fromJSON = function (json) {
        return new SpeechKeyword(json);
    };
    Object.defineProperty(SpeechKeyword.prototype, "Status", {
        get: function () {
            return this.privSpeechKeyword.Status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechKeyword.prototype, "Text", {
        get: function () {
            return this.privSpeechKeyword.Text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechKeyword.prototype, "Offset", {
        get: function () {
            return this.privSpeechKeyword.Offset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechKeyword.prototype, "Duration", {
        get: function () {
            return this.privSpeechKeyword.Duration;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechKeyword;
}());
exports.SpeechKeyword = SpeechKeyword;

//# sourceMappingURL=SpeechKeyword.js.map
