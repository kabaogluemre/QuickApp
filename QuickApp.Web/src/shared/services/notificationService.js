"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    NotificationService.show = function (config) {
        NotificationUI.showMessage(config.Title, config.Message, config.Type);
    };
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notificationService.js.map