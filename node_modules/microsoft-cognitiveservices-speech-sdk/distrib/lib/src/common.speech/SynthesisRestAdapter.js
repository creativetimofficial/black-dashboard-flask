"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesisRestAdapter = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../sdk/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var HeaderNames_1 = require("./HeaderNames");
/**
 * Implements methods for speaker recognition classes, sending requests to endpoint
 * and parsing response into expected format
 * @class SynthesisRestAdapter
 */
var SynthesisRestAdapter = /** @class */ (function () {
    function SynthesisRestAdapter(config, authentication) {
        var endpoint = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        if (!endpoint) {
            var region = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region, "westus");
            var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
            endpoint = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, "https://" + region + ".tts.speech" + hostSuffix);
        }
        this.privUri = endpoint + "/cognitiveservices/voices/list";
        var options = Exports_1.RestConfigBase.requestOptions;
        this.privRestAdapter = new Exports_1.RestMessageAdapter(options);
        this.privAuthentication = authentication;
    }
    /**
     * Sends list voices request to endpoint.
     * @function
     * @public
     * @param connectionId - guid for connectionId
     * @returns {Promise<IRestResponse>} rest response to status request
     */
    SynthesisRestAdapter.prototype.getVoicesList = function (connectionId) {
        var _this = this;
        this.privRestAdapter.setHeaders(HeaderNames_1.HeaderNames.ConnectionId, connectionId);
        return this.privAuthentication.fetch(connectionId).then(function (authInfo) {
            _this.privRestAdapter.setHeaders(authInfo.headerName, authInfo.token);
            return _this.privRestAdapter.request(Exports_1.RestRequestType.Get, _this.privUri);
        });
    };
    return SynthesisRestAdapter;
}());
exports.SynthesisRestAdapter = SynthesisRestAdapter;

//# sourceMappingURL=SynthesisRestAdapter.js.map
