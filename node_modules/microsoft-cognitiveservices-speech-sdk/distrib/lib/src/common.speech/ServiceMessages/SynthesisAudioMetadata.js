"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesisAudioMetadata = exports.MetadataType = void 0;
var MetadataType;
(function (MetadataType) {
    MetadataType["WordBoundary"] = "WordBoundary";
    MetadataType["Bookmark"] = "Bookmark";
    MetadataType["Viseme"] = "Viseme";
    MetadataType["SentenceBoundary"] = "SentenceBoundary";
    MetadataType["SessionEnd"] = "SessionEnd";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
var SynthesisAudioMetadata = /** @class */ (function () {
    function SynthesisAudioMetadata(json) {
        this.privSynthesisAudioMetadata = JSON.parse(json);
    }
    SynthesisAudioMetadata.fromJSON = function (json) {
        return new SynthesisAudioMetadata(json);
    };
    Object.defineProperty(SynthesisAudioMetadata.prototype, "Metadata", {
        get: function () {
            return this.privSynthesisAudioMetadata.Metadata;
        },
        enumerable: false,
        configurable: true
    });
    return SynthesisAudioMetadata;
}());
exports.SynthesisAudioMetadata = SynthesisAudioMetadata;

//# sourceMappingURL=SynthesisAudioMetadata.js.map
