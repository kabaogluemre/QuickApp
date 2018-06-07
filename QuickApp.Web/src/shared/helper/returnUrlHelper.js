"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnUrlHelper = /** @class */ (function () {
    function ReturnUrlHelper() {
    }
    ReturnUrlHelper.getQueryParameters = function () {
        return document.location.search.replace(/(^\?)/, '').split("&").map(function (n) { return n = n.split("="), this[n[0]] = n[1], this; }.bind({}))[0];
    };
    ReturnUrlHelper.initialUrl = location.href;
    return ReturnUrlHelper;
}());
exports.ReturnUrlHelper = ReturnUrlHelper;
//# sourceMappingURL=returnUrlHelper.js.map