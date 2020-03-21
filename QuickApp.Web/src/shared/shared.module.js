"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var ngx_cookie_1 = require("ngx-cookie");
//Inject them
var localizationService_1 = require("@shared/services/localizationService");
var sessionService_1 = require("@shared/services/sessionService");
var route_guard_1 = require("@shared/auth/route-guard");
var cookieUtil_1 = require("@shared/utils/cookieUtil");
//Shared
var confirmationDialog_component_1 = require("@shared/directives/confirmationDialog.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                localizationService_1.LocalizationService,
                sessionService_1.SessionService,
                route_guard_1.RouteGuard,
                cookieUtil_1.CookieUtil
            ]
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ng2_bs3_modal_1.Ng2Bs3ModalModule,
                ngx_cookie_1.CookieModule.forRoot()
            ],
            declarations: [
                confirmationDialog_component_1.ConfirmationDialog
            ],
            exports: [
                confirmationDialog_component_1.ConfirmationDialog //Important for identify selectors in the another modules
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map