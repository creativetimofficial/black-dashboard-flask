"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitiveTokenAuthentication = void 0;
var Exports_1 = require("../common/Exports");
var IAuthentication_1 = require("./IAuthentication");
var HeaderNames_1 = require("./HeaderNames");
var CognitiveTokenAuthentication = /** @class */ (function () {
    function CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) {
        if (!fetchCallback) {
            throw new Exports_1.ArgumentNullError("fetchCallback");
        }
        if (!fetchOnExpiryCallback) {
            throw new Exports_1.ArgumentNullError("fetchOnExpiryCallback");
        }
        this.privFetchCallback = fetchCallback;
        this.privFetchOnExpiryCallback = fetchOnExpiryCallback;
    }
    CognitiveTokenAuthentication.prototype.fetch = function (authFetchEventId) {
        return this.privFetchCallback(authFetchEventId).then(function (token) { return new IAuthentication_1.AuthInfo(HeaderNames_1.HeaderNames.Authorization, token === undefined ? undefined : CognitiveTokenAuthentication.privTokenPrefix + token); });
    };
    CognitiveTokenAuthentication.prototype.fetchOnExpiry = function (authFetchEventId) {
        return this.privFetchOnExpiryCallback(authFetchEventId).then(function (token) { return new IAuthentication_1.AuthInfo(HeaderNames_1.HeaderNames.Authorization, token === undefined ? undefined : CognitiveTokenAuthentication.privTokenPrefix + token); });
    };
    CognitiveTokenAuthentication.privTokenPrefix = "bearer ";
    return CognitiveTokenAuthentication;
}());
exports.CognitiveTokenAuthentication = CognitiveTokenAuthentication;

//# sourceMappingURL=CognitiveTokenAuthentication.js.map
