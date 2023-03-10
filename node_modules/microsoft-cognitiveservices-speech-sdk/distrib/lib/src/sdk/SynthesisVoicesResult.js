"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesisVoicesResult = void 0;
var Exports_1 = require("./Exports");
/**
 * Defines result of speech synthesis.
 * @class SynthesisVoicesResult
 * Added in version 1.20.0
 */
var SynthesisVoicesResult = /** @class */ (function (_super) {
    __extends(SynthesisVoicesResult, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param requestId - result id for request.
     * @param json - json payload from endpoint.
     */
    function SynthesisVoicesResult(requestId, json, errorDetails) {
        var _this = this;
        if (Array.isArray(json)) {
            _this = _super.call(this, requestId, Exports_1.ResultReason.VoicesListRetrieved, undefined, new Exports_1.PropertyCollection()) || this;
            _this.privVoices = [];
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var item = json_1[_i];
                _this.privVoices.push(new Exports_1.VoiceInfo(item));
            }
        }
        else {
            _this = _super.call(this, requestId, Exports_1.ResultReason.Canceled, errorDetails ? errorDetails : "Error information unavailable", new Exports_1.PropertyCollection()) || this;
        }
        return _this;
    }
    Object.defineProperty(SynthesisVoicesResult.prototype, "voices", {
        /**
         * The list of voices
         * @member SynthesisVoicesResult.prototype.voices
         * @function
         * @public
         * @returns {VoiceInfo[]} List of synthesized voices.
         */
        get: function () {
            return this.privVoices;
        },
        enumerable: false,
        configurable: true
    });
    return SynthesisVoicesResult;
}(Exports_1.SynthesisResult));
exports.SynthesisVoicesResult = SynthesisVoicesResult;

//# sourceMappingURL=SynthesisVoicesResult.js.map
