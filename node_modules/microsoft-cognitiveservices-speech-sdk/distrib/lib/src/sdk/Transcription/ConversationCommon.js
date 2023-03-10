"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationCommon = void 0;
var ConversationCommon = /** @class */ (function () {
    function ConversationCommon(audioConfig) {
        this.privAudioConfig = audioConfig;
    }
    ConversationCommon.prototype.handleCallback = function (cb, err) {
        if (!!cb) {
            try {
                cb();
            }
            catch (e) {
                if (!!err) {
                    err(e);
                }
            }
            cb = undefined;
        }
    };
    ConversationCommon.prototype.handleError = function (error, err) {
        if (!!err) {
            if (error instanceof Error) {
                var typedError = error;
                err(typedError.name + ": " + typedError.message);
            }
            else {
                err(error);
            }
        }
    };
    return ConversationCommon;
}());
exports.ConversationCommon = ConversationCommon;

//# sourceMappingURL=ConversationCommon.js.map
