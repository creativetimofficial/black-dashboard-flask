"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandResponsePayload = void 0;
var parseCommandResponse = function (json) { return JSON.parse(json); };
var CommandResponsePayload = /** @class */ (function () {
    function CommandResponsePayload(json) {
        this.privCommandResponse = parseCommandResponse(json);
    }
    Object.defineProperty(CommandResponsePayload.prototype, "type", {
        get: function () {
            return this.privCommandResponse.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "command", {
        get: function () {
            return this.privCommandResponse.command;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "id", {
        get: function () {
            return this.privCommandResponse.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "nickname", {
        get: function () {
            return this.privCommandResponse.nickname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "participantId", {
        get: function () {
            return this.privCommandResponse.participantId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "roomid", {
        get: function () {
            return this.privCommandResponse.roomid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "value", {
        get: function () {
            return this.privCommandResponse.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandResponsePayload.prototype, "token", {
        get: function () {
            return this.privCommandResponse.token;
        },
        enumerable: false,
        configurable: true
    });
    CommandResponsePayload.fromJSON = function (json) {
        return new CommandResponsePayload(json);
    };
    return CommandResponsePayload;
}());
exports.CommandResponsePayload = CommandResponsePayload;

//# sourceMappingURL=CommandResponsePayload.js.map
