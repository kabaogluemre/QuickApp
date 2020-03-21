"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var media_type_1 = require("@shared/enums/media-type");
var cookieUtil_1 = require("@shared/utils/cookieUtil");
var auth_consts_1 = require("@shared/auth/auth-consts");
var notificationConfig_1 = require("@shared/models/notification/notificationConfig");
var notificationType_1 = require("@shared/enums/notificationType");
var notificationService_1 = require("@shared/services/notificationService");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
var BaseService = /** @class */ (function () {
    function BaseService(injector) {
        this.cookieUtil = injector.get(cookieUtil_1.CookieUtil);
    }
    BaseService.prototype.createHeaders = function (contentType, accept, useAuthenticationHeader) {
        var headers = new http_1.Headers({
            "Content-Type": contentType,
            "Accept": accept
        });
        if (useAuthenticationHeader) {
            var authToken = this.cookieUtil.getValueByKey(auth_consts_1.AuthConsts.CookieKey);
            if (authToken && authToken.length > 10) {
                headers.append("Authorization", "Bearer " + authToken);
            }
        }
        return headers;
    };
    BaseService.prototype.prepareGetRequest = function (contentType, accept, useAuthenticationHeader) {
        if (useAuthenticationHeader === void 0) { useAuthenticationHeader = true; }
        if (contentType == null) {
            contentType = "application/json";
        }
        if (accept == null) {
            accept = "application/json";
        }
        var options = {
            method: "get",
            headers: this.createHeaders(contentType, accept, useAuthenticationHeader)
        };
        return options;
    };
    ;
    BaseService.prototype.preparePostRequest = function (payload, contentType, accept, useAuthenticationHeader) {
        if (useAuthenticationHeader === void 0) { useAuthenticationHeader = true; }
        var input = "";
        if (contentType == null) {
            contentType = media_type_1.MediaType.Json;
        }
        if (accept == null) {
            accept = media_type_1.MediaType.Json;
        }
        if (contentType == media_type_1.MediaType.Json) {
            input = JSON.stringify(payload);
        }
        else {
            Object.keys(payload).forEach(function (key) { return input += key + "=" + payload[key] + "&"; });
            input = input.slice(0, -1);
        }
        var options = {
            body: input,
            method: "post",
            headers: this.createHeaders(contentType, accept, useAuthenticationHeader)
        };
        return options;
    };
    ;
    BaseService.prototype.handleError = function (error) {
        var errorModel = JSON.parse((error.text()));
        if (errorModel.ErrorMessage == null) {
            errorModel.ErrorMessage = "UnexpectedError";
        }
        notificationService_1.NotificationService.show(new notificationConfig_1.NotificationConfig("", errorModel.ErrorMessage, notificationType_1.NotificationType.Error));
        Metronic.unblockUI();
        if (error.status === 401) { //Unauthorized
        }
        return Observable_1.Observable.throw(error.json());
    };
    ;
    BaseService.prototype.processError = function (error) {
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=baseService.js.map