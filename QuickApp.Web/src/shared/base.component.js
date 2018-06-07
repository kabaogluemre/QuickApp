"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localizationService_1 = require("./services/localizationService");
var sessionService_1 = require("./services/sessionService");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(injector) {
        this.localizationService = injector.get(localizationService_1.LocalizationService);
        this.sessionService = injector.get(sessionService_1.SessionService);
    }
    BaseComponent.prototype.loc = function (key) {
        return this.localizationService.getLocalizedText(key);
    };
    ;
    Object.defineProperty(BaseComponent.prototype, "currentUser", {
        get: function () {
            return this.sessionService.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "currentLanguage", {
        get: function () {
            return this.sessionService.currentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "languages", {
        get: function () {
            return this.sessionService.languages;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.isGranted = function (permissionName) {
        return this.sessionService.isGranted(permissionName);
    };
    ;
    BaseComponent.prototype.setUIBusy = function () {
        Metronic.blockUI();
    };
    BaseComponent.prototype.removeUIBusy = function () {
        Metronic.unblockUI();
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map