"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var account_routing_1 = require("./account.routing");
var shared_module_1 = require("@shared/shared.module");
//Components
var account_component_1 = require("./account.component");
var login_component_1 = require("./login/login.component");
var loginService_1 = require("./services/loginService");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                shared_module_1.SharedModule,
                account_routing_1.AccountRoutingModule
            ],
            declarations: [
                account_component_1.AccountComponent,
                login_component_1.LoginComponent
            ],
            providers: [
                loginService_1.LoginService
            ]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map