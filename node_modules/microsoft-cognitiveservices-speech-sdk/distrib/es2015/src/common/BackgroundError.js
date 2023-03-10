// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { EventType, PlatformEvent } from "./Exports";
export class BackgroundEvent extends PlatformEvent {
    constructor(error) {
        super("BackgroundEvent", EventType.Error);
        this.privError = error;
    }
    get error() {
        return this.privError;
    }
}

//# sourceMappingURL=BackgroundError.js.map
