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
var core_1 = require("@angular/core");
var base_component_1 = require("@shared/base.component");
var loginInputModel_1 = require("../models/login/loginInputModel");
var loginService_1 = require("../services/loginService");
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(injector, loginService) {
        var _this = _super.call(this, injector) || this;
        _this.loginService = loginService;
        _this.loginModel = new loginInputModel_1.LoginInputModel();
        _this.submitDisabled = false;
        return _this;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        var authenticationInput = {
            GrantType: "password",
            Username: this.loginModel.Username,
            Password: this.loginModel.Password,
            ClientId: !this.loginModel.Rememberme ? "AngularApp" : "AngularApp-RememberMe",
            ClientSecret: !this.loginModel.Rememberme ? "9z5bRzBEyJCE3fAz" : "yurZ3YE3nGQk5DGW"
        };
        this.submitDisabled = true;
        this.loginService.authenticate(authenticationInput, function () { return _this.submitDisabled = false; });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: '/src/account/login/login.component.html',
            styleUrls: [
                '../metronic/admin/layout/css/login.css'
            ]
        }),
        __metadata("design:paramtypes", [core_1.Injector, loginService_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}(base_component_1.BaseComponent));
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map