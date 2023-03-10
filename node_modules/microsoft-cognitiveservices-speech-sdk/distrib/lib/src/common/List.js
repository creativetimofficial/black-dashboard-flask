"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var Error_1 = require("./Error");
var List = /** @class */ (function () {
    function List(list) {
        this.privSubscriptionIdCounter = 0;
        this.privAddSubscriptions = {};
        this.privRemoveSubscriptions = {};
        this.privDisposedSubscriptions = {};
        this.privDisposeReason = null;
        this.privList = [];
        // copy the list rather than taking as is.
        if (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                this.privList.push(item);
            }
        }
    }
    List.prototype.get = function (itemIndex) {
        this.throwIfDisposed();
        return this.privList[itemIndex];
    };
    List.prototype.first = function () {
        return this.get(0);
    };
    List.prototype.last = function () {
        return this.get(this.length() - 1);
    };
    List.prototype.add = function (item) {
        this.throwIfDisposed();
        this.insertAt(this.privList.length, item);
    };
    List.prototype.insertAt = function (index, item) {
        this.throwIfDisposed();
        if (index === 0) {
            this.privList.unshift(item);
        }
        else if (index === this.privList.length) {
            this.privList.push(item);
        }
        else {
            this.privList.splice(index, 0, item);
        }
        this.triggerSubscriptions(this.privAddSubscriptions);
    };
    List.prototype.removeFirst = function () {
        this.throwIfDisposed();
        return this.removeAt(0);
    };
    List.prototype.removeLast = function () {
        this.throwIfDisposed();
        return this.removeAt(this.length() - 1);
    };
    List.prototype.removeAt = function (index) {
        this.throwIfDisposed();
        return this.remove(index, 1)[0];
    };
    List.prototype.remove = function (index, count) {
        this.throwIfDisposed();
        var removedElements = this.privList.splice(index, count);
        this.triggerSubscriptions(this.privRemoveSubscriptions);
        return removedElements;
    };
    List.prototype.clear = function () {
        this.throwIfDisposed();
        this.remove(0, this.length());
    };
    List.prototype.length = function () {
        this.throwIfDisposed();
        return this.privList.length;
    };
    List.prototype.onAdded = function (addedCallback) {
        var _this = this;
        this.throwIfDisposed();
        var subscriptionId = this.privSubscriptionIdCounter++;
        this.privAddSubscriptions[subscriptionId] = addedCallback;
        return {
            detach: function () {
                delete _this.privAddSubscriptions[subscriptionId];
                return Promise.resolve();
            },
        };
    };
    List.prototype.onRemoved = function (removedCallback) {
        var _this = this;
        this.throwIfDisposed();
        var subscriptionId = this.privSubscriptionIdCounter++;
        this.privRemoveSubscriptions[subscriptionId] = removedCallback;
        return {
            detach: function () {
                delete _this.privRemoveSubscriptions[subscriptionId];
                return Promise.resolve();
            },
        };
    };
    List.prototype.onDisposed = function (disposedCallback) {
        var _this = this;
        this.throwIfDisposed();
        var subscriptionId = this.privSubscriptionIdCounter++;
        this.privDisposedSubscriptions[subscriptionId] = disposedCallback;
        return {
            detach: function () {
                delete _this.privDisposedSubscriptions[subscriptionId];
                return Promise.resolve();
            },
        };
    };
    List.prototype.join = function (seperator) {
        this.throwIfDisposed();
        return this.privList.join(seperator);
    };
    List.prototype.toArray = function () {
        var cloneCopy = Array();
        this.privList.forEach(function (val) {
            cloneCopy.push(val);
        });
        return cloneCopy;
    };
    List.prototype.any = function (callback) {
        this.throwIfDisposed();
        if (callback) {
            return this.where(callback).length() > 0;
        }
        else {
            return this.length() > 0;
        }
    };
    List.prototype.all = function (callback) {
        this.throwIfDisposed();
        return this.where(callback).length() === this.length();
    };
    List.prototype.forEach = function (callback) {
        this.throwIfDisposed();
        for (var i = 0; i < this.length(); i++) {
            callback(this.privList[i], i);
        }
    };
    List.prototype.select = function (callback) {
        this.throwIfDisposed();
        var selectList = [];
        for (var i = 0; i < this.privList.length; i++) {
            selectList.push(callback(this.privList[i], i));
        }
        return new List(selectList);
    };
    List.prototype.where = function (callback) {
        this.throwIfDisposed();
        var filteredList = new List();
        for (var i = 0; i < this.privList.length; i++) {
            if (callback(this.privList[i], i)) {
                filteredList.add(this.privList[i]);
            }
        }
        return filteredList;
    };
    List.prototype.orderBy = function (compareFn) {
        this.throwIfDisposed();
        var clonedArray = this.toArray();
        var orderedArray = clonedArray.sort(compareFn);
        return new List(orderedArray);
    };
    List.prototype.orderByDesc = function (compareFn) {
        this.throwIfDisposed();
        return this.orderBy(function (a, b) { return compareFn(b, a); });
    };
    List.prototype.clone = function () {
        this.throwIfDisposed();
        return new List(this.toArray());
    };
    List.prototype.concat = function (list) {
        this.throwIfDisposed();
        return new List(this.privList.concat(list.toArray()));
    };
    List.prototype.concatArray = function (array) {
        this.throwIfDisposed();
        return new List(this.privList.concat(array));
    };
    List.prototype.isDisposed = function () {
        return this.privList == null;
    };
    List.prototype.dispose = function (reason) {
        if (!this.isDisposed()) {
            this.privDisposeReason = reason;
            this.privList = null;
            this.privAddSubscriptions = null;
            this.privRemoveSubscriptions = null;
            this.triggerSubscriptions(this.privDisposedSubscriptions);
        }
    };
    List.prototype.throwIfDisposed = function () {
        if (this.isDisposed()) {
            throw new Error_1.ObjectDisposedError("List", this.privDisposeReason);
        }
    };
    List.prototype.triggerSubscriptions = function (subscriptions) {
        if (subscriptions) {
            for (var subscriptionId in subscriptions) {
                if (subscriptionId) {
                    subscriptions[subscriptionId]();
                }
            }
        }
    };
    return List;
}());
exports.List = List;

//# sourceMappingURL=List.js.map
