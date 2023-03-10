"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.marshalPromiseToCallbacks = exports.Sink = exports.Deferred = exports.PromiseResultEventSource = exports.PromiseResult = exports.PromiseState = void 0;
/* eslint-disable max-classes-per-file, @typescript-eslint/typedef */
var PromiseState;
(function (PromiseState) {
    PromiseState[PromiseState["None"] = 0] = "None";
    PromiseState[PromiseState["Resolved"] = 1] = "Resolved";
    PromiseState[PromiseState["Rejected"] = 2] = "Rejected";
})(PromiseState = exports.PromiseState || (exports.PromiseState = {}));
var PromiseResult = /** @class */ (function () {
    function PromiseResult(promiseResultEventSource) {
        var _this = this;
        this.throwIfError = function () {
            if (_this.isError) {
                throw _this.error;
            }
        };
        promiseResultEventSource.on(function (result) {
            if (!_this.privIsCompleted) {
                _this.privIsCompleted = true;
                _this.privIsError = false;
                _this.privResult = result;
            }
        }, function (error) {
            if (!_this.privIsCompleted) {
                _this.privIsCompleted = true;
                _this.privIsError = true;
                _this.privError = error;
            }
        });
    }
    Object.defineProperty(PromiseResult.prototype, "isCompleted", {
        get: function () {
            return this.privIsCompleted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PromiseResult.prototype, "isError", {
        get: function () {
            return this.privIsError;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PromiseResult.prototype, "error", {
        get: function () {
            return this.privError;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PromiseResult.prototype, "result", {
        get: function () {
            return this.privResult;
        },
        enumerable: false,
        configurable: true
    });
    return PromiseResult;
}());
exports.PromiseResult = PromiseResult;
var PromiseResultEventSource = /** @class */ (function () {
    function PromiseResultEventSource() {
        var _this = this;
        this.setResult = function (result) {
            _this.privOnSetResult(result);
        };
        this.setError = function (error) {
            _this.privOnSetError(error);
        };
        this.on = function (onSetResult, onSetError) {
            _this.privOnSetResult = onSetResult;
            _this.privOnSetError = onSetError;
        };
    }
    return PromiseResultEventSource;
}());
exports.PromiseResultEventSource = PromiseResultEventSource;
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.resolve = function (result) {
            _this.privResolve(result);
            return _this;
        };
        this.reject = function (error) {
            _this.privReject(error);
            return _this;
        };
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        this.privPromise = new Promise(function (resolve, reject) {
            _this.privResolve = resolve;
            _this.privReject = reject;
        });
    }
    Object.defineProperty(Deferred.prototype, "promise", {
        get: function () {
            return this.privPromise;
        },
        enumerable: false,
        configurable: true
    });
    return Deferred;
}());
exports.Deferred = Deferred;
var Sink = /** @class */ (function () {
    function Sink() {
        this.privState = PromiseState.None;
        this.privPromiseResult = null;
        this.privPromiseResultEvents = null;
        this.privSuccessHandlers = [];
        this.privErrorHandlers = [];
        this.privPromiseResultEvents = new PromiseResultEventSource();
        this.privPromiseResult = new PromiseResult(this.privPromiseResultEvents);
    }
    Object.defineProperty(Sink.prototype, "state", {
        get: function () {
            return this.privState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Sink.prototype, "result", {
        get: function () {
            return this.privPromiseResult;
        },
        enumerable: false,
        configurable: true
    });
    Sink.prototype.resolve = function (result) {
        if (this.privState !== PromiseState.None) {
            throw new Error("'Cannot resolve a completed promise'");
        }
        this.privState = PromiseState.Resolved;
        this.privPromiseResultEvents.setResult(result);
        for (var i = 0; i < this.privSuccessHandlers.length; i++) {
            this.executeSuccessCallback(result, this.privSuccessHandlers[i], this.privErrorHandlers[i]);
        }
        this.detachHandlers();
    };
    Sink.prototype.reject = function (error) {
        if (this.privState !== PromiseState.None) {
            throw new Error("'Cannot reject a completed promise'");
        }
        this.privState = PromiseState.Rejected;
        this.privPromiseResultEvents.setError(error);
        for (var _i = 0, _a = this.privErrorHandlers; _i < _a.length; _i++) {
            var errorHandler = _a[_i];
            this.executeErrorCallback(error, errorHandler);
        }
        this.detachHandlers();
    };
    Sink.prototype.on = function (successCallback, errorCallback) {
        if (successCallback == null) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            successCallback = function () { };
        }
        if (this.privState === PromiseState.None) {
            this.privSuccessHandlers.push(successCallback);
            this.privErrorHandlers.push(errorCallback);
        }
        else {
            if (this.privState === PromiseState.Resolved) {
                this.executeSuccessCallback(this.privPromiseResult.result, successCallback, errorCallback);
            }
            else if (this.privState === PromiseState.Rejected) {
                this.executeErrorCallback(this.privPromiseResult.error, errorCallback);
            }
            this.detachHandlers();
        }
    };
    Sink.prototype.executeSuccessCallback = function (result, successCallback, errorCallback) {
        try {
            successCallback(result);
        }
        catch (e) {
            this.executeErrorCallback("'Unhandled callback error: " + e + "'", errorCallback);
        }
    };
    Sink.prototype.executeErrorCallback = function (error, errorCallback) {
        if (errorCallback) {
            try {
                errorCallback(error);
            }
            catch (e) {
                throw new Error("'Unhandled callback error: " + e + ". InnerError: " + error + "'");
            }
        }
        else {
            throw new Error("'Unhandled error: " + error + "'");
        }
    };
    Sink.prototype.detachHandlers = function () {
        this.privErrorHandlers = [];
        this.privSuccessHandlers = [];
    };
    return Sink;
}());
exports.Sink = Sink;
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function marshalPromiseToCallbacks(promise, cb, err) {
    promise.then(function (val) {
        try {
            if (!!cb) {
                cb(val);
            }
        }
        catch (error) {
            if (!!err) {
                try {
                    if (error instanceof Error) {
                        var typedError = error;
                        err(typedError.name + ": " + typedError.message);
                    }
                    else {
                        err(error);
                    }
                    // eslint-disable-next-line no-empty
                }
                catch (error) { }
            }
        }
    }, function (error) {
        if (!!err) {
            try {
                if (error instanceof Error) {
                    var typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
                // eslint-disable-next-line no-empty
            }
            catch (error) { }
        }
    });
}
exports.marshalPromiseToCallbacks = marshalPromiseToCallbacks;

//# sourceMappingURL=Promise.js.map
