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
exports.ConversationTranscriptionCanceledEventArgs = void 0;
var CancellationEventArgsBase_1 = require("./CancellationEventArgsBase");
/**
 * Defines content of a RecognitionErrorEvent.
 * @class ConversationTranscriptionCanceledEventArgs
 */
var ConversationTranscriptionCanceledEventArgs = /** @class */ (function (_super) {
    __extends(ConversationTranscriptionCanceledEventArgs, _super);
    function ConversationTranscriptionCanceledEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConversationTranscriptionCanceledEventArgs;
}(CancellationEventArgsBase_1.CancellationEventArgsBase));
exports.ConversationTranscriptionCanceledEventArgs = ConversationTranscriptionCanceledEventArgs;

//# sourceMappingURL=ConversationTranscriptionCanceledEventArgs.js.map
