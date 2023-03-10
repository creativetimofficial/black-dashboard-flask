// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Represents the JSON used in the agent.config message sent to the speech service.
 */
export class AgentConfig {
    toJsonString() {
        return JSON.stringify(this.iPrivConfig);
    }
    get() {
        return this.iPrivConfig;
    }
    /**
     * Setter for the agent.config object.
     * @param value a JSON serializable object.
     */
    set(value) {
        this.iPrivConfig = value;
    }
}

//# sourceMappingURL=AgentConfig.js.map
