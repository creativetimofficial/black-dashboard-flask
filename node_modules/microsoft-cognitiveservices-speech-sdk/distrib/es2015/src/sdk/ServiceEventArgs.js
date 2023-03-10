//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
import { SessionEventArgs } from "./Exports";
/**
 * Defines payload for any Service message event
 * Added in version 1.9.0
 */
export class ServiceEventArgs extends SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} json - json payload of the USP message.
     */
    constructor(json, name, sessionId) {
        super(sessionId);
        this.privJsonResult = json;
        this.privEventName = name;
    }
    get jsonString() {
        return this.privJsonResult;
    }
    get eventName() {
        return this.privEventName;
    }
}

//# sourceMappingURL=ServiceEventArgs.js.map
