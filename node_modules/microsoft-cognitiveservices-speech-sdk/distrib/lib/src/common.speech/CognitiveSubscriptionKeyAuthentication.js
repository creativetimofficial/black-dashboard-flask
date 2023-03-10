"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitiveSubscriptionKeyAuthentication = void 0;
var Exports_1 = require("../common/Exports");
var HeaderNames_1 = require("./HeaderNames");
var IAuthentication_1 = require("./IAuthentication");
/**
 * @class
 */
var CognitiveSubscriptionKeyAuthentication = /** @class */ (function () {
    /**
     * Creates and initializes an instance of the CognitiveSubscriptionKeyAuthentication class.
     * @constructor
     * @param {string} subscriptionKey - The subscription key
     */
    function CognitiveSubscriptionKeyAuthentication(subscriptionKey) {
        if (!subscriptionKey) {
            throw new Exports_1.ArgumentNullError("subscriptionKey");
        }
        this.privAuthInfo = new IAuthentication_1.AuthInfo(HeaderNames_1.HeaderNames.AuthKey, subscriptionKey);
    }
    /**
     * Fetches the subscription key.
     * @member
     * @function
     * @public
     * @param {string} authFetchEventId - The id to fetch.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CognitiveSubscriptionKeyAuthentication.prototype.fetch = function (authFetchEventId) {
        return Promise.resolve(this.privAuthInfo);
    };
    /**
     * Fetches the subscription key.
     * @member
     * @function
     * @public
     * @param {string} authFetchEventId - The id to fetch.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CognitiveSubscriptionKeyAuthentication.prototype.fetchOnExpiry = function (authFetchEventId) {
        return Promise.resolve(this.privAuthInfo);
    };
    return CognitiveSubscriptionKeyAuthentication;
}());
exports.CognitiveSubscriptionKeyAuthentication = CognitiveSubscriptionKeyAuthentication;

//# sourceMappingURL=CognitiveSubscriptionKeyAuthentication.js.map
