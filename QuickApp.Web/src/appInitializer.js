"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localizationService_1 = require("@shared/services/localizationService");
var sessionService_1 = require("@shared/services/sessionService");
var AppInitializer = /** @class */ (function () {
    function AppInitializer() {
    }
    // Wait until the localizations and session has been loaded
    AppInitializer.run = function (injector) {
        var localizationService = injector.get(localizationService_1.LocalizationService);
        var sessionService = injector.get(sessionService_1.SessionService);
        var localizationPromise = localizationService.init();
        var sessionPromise = sessionService.init();
        return Promise.all([localizationPromise, sessionPromise]);
    };
    return AppInitializer;
}());
exports.AppInitializer = AppInitializer;
//# sourceMappingURL=appInitializer.js.map