"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var appconsts_1 = require("@shared/appconsts");
var baseService_1 = require("@shared/services/baseService");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var RoleService = /** @class */ (function (_super) {
    __extends(RoleService, _super);
    function RoleService(_http, injector) {
        var _this = _super.call(this, injector) || this;
        _this._http = _http;
        _this.baseUrl = appconsts_1.AppConsts.BASE_ROLE_ENDPOINT;
        return _this;
    }
    RoleService.prototype.GetRoles = function () {
        var url = this.baseUrl + "/GetRoles";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    RoleService.prototype.GetRole = function (roleId) {
        var url = this.baseUrl + "/GetRole";
        var options = this.preparePostRequest({ RoleId: roleId });
        return this._http.request(url, options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    RoleService.prototype.CreateRole = function (role, grantedPermissions) {
        var url = this.baseUrl + "/CreateRole";
        var options = this.preparePostRequest({ role: role, grantedPermissions: grantedPermissions });
        return this._http.request(url, options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    RoleService.prototype.DeleteRole = function (roleId) {
        var url = this.baseUrl + "/DeleteRole";
        var options = this.preparePostRequest({ RoleId: roleId });
        return this._http.request(url, options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    RoleService.prototype.GetPermissions = function () {
        var url = this.baseUrl + "/GetPermissions";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    RoleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, core_1.Injector])
    ], RoleService);
    return RoleService;
}(baseService_1.BaseService));
exports.RoleService = RoleService;
//# sourceMappingURL=roleService.js.map