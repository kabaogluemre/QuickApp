"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var core_1 = require("@angular/core");
var appconsts_1 = require("@shared/appconsts");
var baseService_1 = require("@shared/services/baseService");
var cookieUtil_1 = require("@shared/utils/cookieUtil");
var http_1 = require("@angular/http");
var media_type_1 = require("@shared/enums/media-type");
var auth_consts_1 = require("@shared/auth/auth-consts");
var returnUrlHelper_1 = require("@shared/helper/returnUrlHelper");
var notificationConfig_1 = require("@shared/models/notification/notificationConfig");
var notificationType_1 = require("@shared/enums/notificationType");
var notificationService_1 = require("@shared/services/notificationService");
var localizationService_1 = require("@shared/services/localizationService");
var LoginService = /** @class */ (function (_super) {
    __extends(LoginService, _super);
    function LoginService(_http, _cookieUtil, _localizationService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._http = _http;
        _this._cookieUtil = _cookieUtil;
        _this._localizationService = _localizationService;
        _this.baseUrl = appconsts_1.AppConsts.BASE_TOKEN_ENDPOINT;
        return _this;
    }
    LoginService.prototype.authenticate = function (input, finallyCallback) {
        var _this = this;
        this.applyTokenRequest(input)
            .subscribe(function (result) {
            _this.login(result);
            finallyCallback();
        });
    };
    LoginService.prototype.login = function (result) {
        if (result.IsSuccess) {
            //Login the user
            this._cookieUtil.removeByKey(auth_consts_1.AuthConsts.CookieKey);
            var expireDate = new Date();
            expireDate.setSeconds(expireDate.getMinutes() + (result.ExpiresIn - 120));
            this._cookieUtil.setCookie(auth_consts_1.AuthConsts.CookieKey, result.AccessToken, expireDate);
            var initialUrl = returnUrlHelper_1.ReturnUrlHelper.initialUrl;
            if (initialUrl.indexOf('/login') > 0) {
                initialUrl = '/';
            }
            location.href = initialUrl;
        }
        else {
            notificationService_1.NotificationService.show(new notificationConfig_1.NotificationConfig(this._localizationService.getLocalizedText("InvalidLoginAttempt"), this._localizationService.getLocalizedText("UsernameOrPasswordWrong"), notificationType_1.NotificationType.Error));
            //Provide a notification service and send a warning
            //Raise warning
        }
    };
    LoginService.prototype.applyTokenRequest = function (input) {
        var _this = this;
        var url = this.baseUrl;
        var options = this.preparePostRequest({
            grant_type: input.GrantType,
            username: input.Username,
            password: input.Password,
            client_id: input.ClientId,
            client_secret: input.ClientSecret
        }, media_type_1.MediaType.FormEncoded, media_type_1.MediaType.Json);
        return this._http.request(url, options)
            .map(function (response) {
            return _this.processTokenRequest(response);
        })
            .catch(function (response) {
            return Observable_1.Observable.of(_this.processTokenRequest(response));
        });
    };
    LoginService.prototype.processTokenRequest = function (response) {
        var authenticationResult = {
            AccessToken: "",
            ExpiresIn: 0,
            IsSuccess: false
        };
        if (response.status == 200) {
            var result = response.json();
            authenticationResult.IsSuccess = true;
            authenticationResult.AccessToken = result.access_token;
            authenticationResult.ExpiresIn = result.expires_in;
        }
        return authenticationResult;
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            cookieUtil_1.CookieUtil,
            localizationService_1.LocalizationService,
            core_1.Injector])
    ], LoginService);
    return LoginService;
}(baseService_1.BaseService));
exports.LoginService = LoginService;
//# sourceMappingURL=loginService.js.map