// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Context } from "./Exports";
export class SpeakerRecognitionConfig {
    constructor(context, parameters) {
        this.privContext = context ? context : new Context(null);
        this.privParameters = parameters;
    }
    get parameters() {
        return this.privParameters;
    }
    get Context() {
        return this.privContext;
    }
}

//# sourceMappingURL=SpeakerRecognitionConfig.js.map
