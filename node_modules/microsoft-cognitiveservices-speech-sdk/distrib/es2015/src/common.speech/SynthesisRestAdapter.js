import { RestConfigBase, RestMessageAdapter, RestRequestType, } from "../common.browser/Exports";
import { PropertyId, } from "../sdk/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { HeaderNames } from "./HeaderNames";
/**
 * Implements methods for speaker recognition classes, sending requests to endpoint
 * and parsing response into expected format
 * @class SynthesisRestAdapter
 */
export class SynthesisRestAdapter {
    constructor(config, authentication) {
        let endpoint = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Endpoint, undefined);
        if (!endpoint) {
            const region = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Region, "westus");
            const hostSuffix = ConnectionFactoryBase.getHostSuffix(region);
            endpoint = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Host, `https://${region}.tts.speech${hostSuffix}`);
        }
        this.privUri = `${endpoint}/cognitiveservices/voices/list`;
        const options = RestConfigBase.requestOptions;
        this.privRestAdapter = new RestMessageAdapter(options);
        this.privAuthentication = authentication;
    }
    /**
     * Sends list voices request to endpoint.
     * @function
     * @public
     * @param connectionId - guid for connectionId
     * @returns {Promise<IRestResponse>} rest response to status request
     */
    getVoicesList(connectionId) {
        this.privRestAdapter.setHeaders(HeaderNames.ConnectionId, connectionId);
        return this.privAuthentication.fetch(connectionId).then((authInfo) => {
            this.privRestAdapter.setHeaders(authInfo.headerName, authInfo.token);
            return this.privRestAdapter.request(RestRequestType.Get, this.privUri);
        });
    }
}

//# sourceMappingURL=SynthesisRestAdapter.js.map
