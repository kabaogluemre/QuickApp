"use strict";
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
var core_1 = require("@angular/core");
var ngx_cookie_1 = require("ngx-cookie");
var appconsts_1 = require("../appconsts");
var CookieUtil = /** @class */ (function () {
    function CookieUtil(cookieService) {
        this.cookieService = cookieService;
    }
    CookieUtil.prototype.setCookie = function (key, value, expireDate) {
        var options = {
            expires: expireDate,
            path: appconsts_1.AppConsts.BASE_APP_ENDPOINT
        };
        this.cookieService.put(key, value, options);
    };
    CookieUtil.prototype.removeAllCookies = function () {
        this.cookieService.removeAll();
    };
    CookieUtil.prototype.removeByKey = function (key) {
        var options = {
            path: appconsts_1.AppConsts.BASE_APP_ENDPOINT
        };
        this.cookieService.remove(key, options);
    };
    CookieUtil.prototype.getValueByKey = function (key) {
        return this.cookieService.get(key);
    };
    CookieUtil = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_cookie_1.CookieService])
    ], CookieUtil);
    return CookieUtil;
}());
exports.CookieUtil = CookieUtil;
//# sourceMappingURL=cookieUtil.js.map