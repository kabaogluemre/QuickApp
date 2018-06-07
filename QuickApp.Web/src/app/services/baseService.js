"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var BaseService = (function () {
    function BaseService() {
    }
    BaseService.prototype.prepareGetRequest = function () {
        var options = {
            method: "get",
            headers: new http_1.Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };
        return options;
    };
    ;
    BaseService.prototype.preparePostRequest = function (payload) {
        var input = JSON.stringify(payload);
        var options = {
            body: input,
            method: "post",
            headers: new http_1.Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };
        return options;
    };
    ;
    BaseService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json() || 'Server error');
    };
    ;
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=baseService.js.map