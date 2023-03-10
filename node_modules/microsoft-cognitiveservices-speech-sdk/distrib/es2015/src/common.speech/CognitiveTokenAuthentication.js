// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ArgumentNullError } from "../common/Exports";
import { AuthInfo } from "./IAuthentication";
import { HeaderNames } from "./HeaderNames";
export class CognitiveTokenAuthentication {
    constructor(fetchCallback, fetchOnExpiryCallback) {
        if (!fetchCallback) {
            throw new ArgumentNullError("fetchCallback");
        }
        if (!fetchOnExpiryCallback) {
            throw new ArgumentNullError("fetchOnExpiryCallback");
        }
        this.privFetchCallback = fetchCallback;
        this.privFetchOnExpiryCallback = fetchOnExpiryCallback;
    }
    fetch(authFetchEventId) {
        return this.privFetchCallback(authFetchEventId).then((token) => new AuthInfo(HeaderNames.Authorization, token === undefined ? undefined : CognitiveTokenAuthentication.privTokenPrefix + token));
    }
    fetchOnExpiry(authFetchEventId) {
        return this.privFetchOnExpiryCallback(authFetchEventId).then((token) => new AuthInfo(HeaderNames.Authorization, token === undefined ? undefined : CognitiveTokenAuthentication.privTokenPrefix + token));
    }
}
CognitiveTokenAuthentication.privTokenPrefix = "bearer ";

//# sourceMappingURL=CognitiveTokenAuthentication.js.map
