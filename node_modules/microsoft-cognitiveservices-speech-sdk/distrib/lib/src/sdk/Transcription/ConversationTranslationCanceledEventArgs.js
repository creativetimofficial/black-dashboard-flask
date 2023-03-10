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
exports.ConversationTranslationCanceledEventArgs = void 0;
var CancellationEventArgsBase_1 = require("../CancellationEventArgsBase");
var ConversationTranslationCanceledEventArgs = /** @class */ (function (_super) {
    __extends(ConversationTranslationCanceledEventArgs, _super);
    function ConversationTranslationCanceledEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConversationTranslationCanceledEventArgs;
}(CancellationEventArgsBase_1.CancellationEventArgsBase));
exports.ConversationTranslationCanceledEventArgs = ConversationTranslationCanceledEventArgs;

//# sourceMappingURL=ConversationTranslationCanceledEventArgs.js.map
