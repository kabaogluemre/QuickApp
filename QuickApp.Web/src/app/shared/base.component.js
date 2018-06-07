"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localizationService_1 = require("../services/localizationService");
var BaseComponent = (function () {
    function BaseComponent(injector) {
        this.localizationService = injector.get(localizationService_1.LocalizationService);
    }
    BaseComponent.prototype.loc = function (key) {
        return this.localizationService.GetLocalizedText(key);
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