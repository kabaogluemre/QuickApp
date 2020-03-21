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
var cookieUtil_1 = require("@shared/utils/cookieUtil");
var auth_consts_1 = require("@shared/auth/auth-consts");
var SideBarNavComponent = /** @class */ (function (_super) {
    __extends(SideBarNavComponent, _super);
    function SideBarNavComponent(injector, cookieUtil) {
        var _this = _super.call(this, injector) || this;
        _this.cookieUtil = cookieUtil;
        return _this;
    }
    SideBarNavComponent.prototype.logout = function () {
        this.cookieUtil.removeByKey(auth_consts_1.AuthConsts.CookieKey);
        location.href = "/";
    };
    SideBarNavComponent = __decorate([
        core_1.Component({
            selector: 'sidebar-nav',
            templateUrl: '/src/app/layout/sidebar-nav.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.Injector, cookieUtil_1.CookieUtil])
    ], SideBarNavComponent);
    return SideBarNavComponent;
}(base_component_1.BaseComponent));
exports.SideBarNavComponent = SideBarNavComponent;
//# sourceMappingURL=sidebar-nav.component.js.map