"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionFactoryBase = void 0;
var Exports_1 = require("../common.speech/Exports");
var Exports_2 = require("../sdk/Exports");
var QueryParameterNames_1 = require("./QueryParameterNames");
var ConnectionFactoryBase = /** @class */ (function () {
    function ConnectionFactoryBase() {
    }
    ConnectionFactoryBase.getHostSuffix = function (region) {
        if (!!region) {
            if (region.toLowerCase().startsWith("china")) {
                return ".azure.cn";
            }
            if (region.toLowerCase().startsWith("usgov")) {
                return ".azure.us";
            }
        }
        return ".microsoft.com";
    };
    ConnectionFactoryBase.prototype.setCommonUrlParams = function (config, queryParams, endpoint) {
        var _this = this;
        var propertyIdToParameterMap = new Map([
            [Exports_2.PropertyId.Speech_SegmentationSilenceTimeoutMs, QueryParameterNames_1.QueryParameterNames.SegmentationSilenceTimeoutMs],
            [Exports_2.PropertyId.SpeechServiceConnection_EnableAudioLogging, QueryParameterNames_1.QueryParameterNames.EnableAudioLogging],
            [Exports_2.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, QueryParameterNames_1.QueryParameterNames.EndSilenceTimeoutMs],
            [Exports_2.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, QueryParameterNames_1.QueryParameterNames.InitialSilenceTimeoutMs],
            [Exports_2.PropertyId.SpeechServiceResponse_PostProcessingOption, QueryParameterNames_1.QueryParameterNames.Postprocessing],
            [Exports_2.PropertyId.SpeechServiceResponse_ProfanityOption, QueryParameterNames_1.QueryParameterNames.Profanity],
            [Exports_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, QueryParameterNames_1.QueryParameterNames.EnableWordLevelTimestamps],
            [Exports_2.PropertyId.SpeechServiceResponse_StablePartialResultThreshold, QueryParameterNames_1.QueryParameterNames.StableIntermediateThreshold],
        ]);
        propertyIdToParameterMap.forEach(function (parameterName, propertyId) {
            _this.setUrlParameter(propertyId, parameterName, config, queryParams, endpoint);
        });
        var serviceProperties = JSON.parse(config.parameters.getProperty(Exports_1.ServicePropertiesPropertyName, "{}"));
        Object.keys(serviceProperties).forEach(function (value) {
            queryParams[value] = serviceProperties[value];
        });
    };
    ConnectionFactoryBase.prototype.setUrlParameter = function (propId, parameterName, config, queryParams, endpoint) {
        var value = config.parameters.getProperty(propId, undefined);
        // FIXME: The .search() check will incorrectly match parameter name anywhere in the string
        //        including e.g. the path portion, or even as a substring of other query parameters
        if (value && (!endpoint || endpoint.search(parameterName) === -1)) {
            queryParams[parameterName] = value.toLocaleLowerCase();
        }
    };
    return ConnectionFactoryBase;
}());
exports.ConnectionFactoryBase = ConnectionFactoryBase;

//# sourceMappingURL=ConnectionFactoryBase.js.map
