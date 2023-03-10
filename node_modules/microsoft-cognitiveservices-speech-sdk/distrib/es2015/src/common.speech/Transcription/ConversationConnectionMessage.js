// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ConnectionMessage } from "../../common/Exports";
export class ConversationConnectionMessage extends ConnectionMessage {
    constructor(messageType, body, headers, id) {
        super(messageType, body, headers, id);
        const json = JSON.parse(this.textBody);
        if (json.type !== undefined) {
            this.privConversationMessageType = json.type;
        }
    }
    get conversationMessageType() {
        return this.privConversationMessageType;
    }
}

//# sourceMappingURL=ConversationConnectionMessage.js.map
