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
var appconsts_1 = require("@shared/appconsts");
var LanguageComponent = /** @class */ (function (_super) {
    __extends(LanguageComponent, _super);
    function LanguageComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.cookieUtil = injector.get(cookieUtil_1.CookieUtil);
        return _this;
    }
    LanguageComponent.prototype.changeLanguage = function (language) {
        this.cookieUtil.setCookie(appconsts_1.AppConsts.LANGUAGE_COOKIE_KEY, language.LanguageCode, new Date(new Date().getTime() + 10 * 365 * 86400000)); //10 years
        window.location.reload();
    };
    LanguageComponent = __decorate([
        core_1.Component({
            selector: 'language-component',
            templateUrl: '/src/app/layout/language.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], LanguageComponent);
    return LanguageComponent;
}(base_component_1.BaseComponent));
exports.LanguageComponent = LanguageComponent;
//# sourceMappingURL=language.component.js.map