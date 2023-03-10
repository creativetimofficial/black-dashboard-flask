"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogServiceTurnStateManager = void 0;
var Error_1 = require("../common/Error");
var DialogServiceTurnState_1 = require("./DialogServiceTurnState");
var DialogServiceTurnStateManager = /** @class */ (function () {
    function DialogServiceTurnStateManager() {
        this.privTurnMap = new Map();
        return;
    }
    DialogServiceTurnStateManager.prototype.StartTurn = function (id) {
        if (this.privTurnMap.has(id)) {
            throw new Error_1.InvalidOperationError("Service error: There is already a turn with id:" + id);
        }
        var turnState = new DialogServiceTurnState_1.DialogServiceTurnState(this, id);
        this.privTurnMap.set(id, turnState);
        return this.privTurnMap.get(id);
    };
    DialogServiceTurnStateManager.prototype.GetTurn = function (id) {
        return this.privTurnMap.get(id);
    };
    DialogServiceTurnStateManager.prototype.CompleteTurn = function (id) {
        if (!this.privTurnMap.has(id)) {
            throw new Error_1.InvalidOperationError("Service error: Received turn end for an unknown turn id:" + id);
        }
        var turnState = this.privTurnMap.get(id);
        turnState.complete();
        this.privTurnMap.delete(id);
        return turnState;
    };
    return DialogServiceTurnStateManager;
}());
exports.DialogServiceTurnStateManager = DialogServiceTurnStateManager;

//# sourceMappingURL=DialogServiceTurnStateManager.js.map
