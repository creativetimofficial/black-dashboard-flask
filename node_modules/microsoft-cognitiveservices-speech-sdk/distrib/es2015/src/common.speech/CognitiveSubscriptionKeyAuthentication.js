// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ArgumentNullError, } from "../common/Exports";
import { HeaderNames } from "./HeaderNames";
import { AuthInfo } from "./IAuthentication";
/**
 * @class
 */
export class CognitiveSubscriptionKeyAuthentication {
    /**
     * Creates and initializes an instance of the CognitiveSubscriptionKeyAuthentication class.
     * @constructor
     * @param {string} subscriptionKey - The subscription key
     */
    constructor(subscriptionKey) {
        if (!subscriptionKey) {
            throw new ArgumentNullError("subscriptionKey");
        }
        this.privAuthInfo = new AuthInfo(HeaderNames.AuthKey, subscriptionKey);
    }
    /**
     * Fetches the subscription key.
     * @member
     * @function
     * @public
     * @param {string} authFetchEventId - The id to fetch.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetch(authFetchEventId) {
        return Promise.resolve(this.privAuthInfo);
    }
    /**
     * Fetches the subscription key.
     * @member
     * @function
     * @public
     * @param {string} authFetchEventId - The id to fetch.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchOnExpiry(authFetchEventId) {
        return Promise.resolve(this.privAuthInfo);
    }
}

//# sourceMappingURL=CognitiveSubscriptionKeyAuthentication.js.map
