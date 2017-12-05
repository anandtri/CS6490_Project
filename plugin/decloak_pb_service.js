"use strict";
// package: decloak
// file: decloak.proto
exports.__esModule = true;
var decloak_pb = require("./decloak_pb");
var FetchProxy = /** @class */ (function () {
    function FetchProxy() {
    }
    FetchProxy.serviceName = "decloak.FetchProxy";
    return FetchProxy;
}());
exports.FetchProxy = FetchProxy;
(function (FetchProxy) {
    var fetchPage = /** @class */ (function () {
        function fetchPage() {
        }
        fetchPage.methodName = "fetchPage";
        fetchPage.service = FetchProxy;
        fetchPage.requestStream = false;
        fetchPage.responseStream = true;
        fetchPage.requestType = decloak_pb.FetchURL;
        fetchPage.responseType = decloak_pb.WebPage;
        return fetchPage;
    }());
    FetchProxy.fetchPage = fetchPage;
})(FetchProxy = exports.FetchProxy || (exports.FetchProxy = {}));
exports.FetchProxy = FetchProxy;
var CloakDetector = /** @class */ (function () {
    function CloakDetector() {
    }
    CloakDetector.serviceName = "decloak.CloakDetector";
    return CloakDetector;
}());
exports.CloakDetector = CloakDetector;
(function (CloakDetector) {
    var isCloaked = /** @class */ (function () {
        function isCloaked() {
        }
        isCloaked.methodName = "isCloaked";
        isCloaked.service = CloakDetector;
        isCloaked.requestStream = false;
        isCloaked.responseStream = false;
        isCloaked.requestType = decloak_pb.ListWebPage;
        isCloaked.responseType = decloak_pb.MlResponse;
        return isCloaked;
    }());
    CloakDetector.isCloaked = isCloaked;
})(CloakDetector = exports.CloakDetector || (exports.CloakDetector = {}));
exports.CloakDetector = CloakDetector;
