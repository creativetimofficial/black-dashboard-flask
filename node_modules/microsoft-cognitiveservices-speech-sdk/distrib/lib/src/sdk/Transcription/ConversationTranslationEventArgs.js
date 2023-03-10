"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
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
exports.ConversationTranslationEventArgs = void 0;
var Exports_1 = require("../Exports");
var ConversationTranslationEventArgs = /** @class */ (function (_super) {
    __extends(ConversationTranslationEventArgs, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {ConversationTranslationResult} result - The translation recognition result.
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    function ConversationTranslationEventArgs(result, offset, sessionId) {
        var _this = _super.call(this, offset, sessionId) || this;
        _this.privResult = result;
        return _this;
    }
    Object.defineProperty(ConversationTranslationEventArgs.prototype, "result", {
        /**
         * Specifies the recognition result.
         * @returns {ConversationTranslationResult} the recognition result.
         */
        get: function () {
            return this.privResult;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationTranslationEventArgs;
}(Exports_1.RecognitionEventArgs));
exports.ConversationTranslationEventArgs = ConversationTranslationEventArgs;

//# sourceMappingURL=ConversationTranslationEventArgs.js.map
