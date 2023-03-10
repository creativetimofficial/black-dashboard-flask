"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentConfig = void 0;
/**
 * Represents the JSON used in the agent.config message sent to the speech service.
 */
var AgentConfig = /** @class */ (function () {
    function AgentConfig() {
    }
    AgentConfig.prototype.toJsonString = function () {
        return JSON.stringify(this.iPrivConfig);
    };
    AgentConfig.prototype.get = function () {
        return this.iPrivConfig;
    };
    /**
     * Setter for the agent.config object.
     * @param value a JSON serializable object.
     */
    AgentConfig.prototype.set = function (value) {
        this.iPrivConfig = value;
    };
    return AgentConfig;
}());
exports.AgentConfig = AgentConfig;

//# sourceMappingURL=AgentConfig.js.map
