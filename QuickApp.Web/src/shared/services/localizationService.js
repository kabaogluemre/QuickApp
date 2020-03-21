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
var http_1 = require("@angular/http");
var appconsts_1 = require("../appconsts");
var baseService_1 = require("./baseService");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var LocalizationService = /** @class */ (function (_super) {
    __extends(LocalizationService, _super);
    function LocalizationService(_http, injector) {
        var _this = _super.call(this, injector) || this;
        _this._http = _http;
        _this.baseUrl = appconsts_1.AppConsts.BASE_LOCALIZATION_ENDPOINT;
        _this.localizations = null;
        return _this;
    }
    LocalizationService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getResourceSet().toPromise().then(function (result) {
                _this.localizations = result;
                resolve(true);
            }, function (err) {
                reject(err);
            });
        });
    };
    LocalizationService.prototype.getLocalizedText = function (key) {
        var localize = this.localizations.filter(function (x) { return x.Key == key; })[0];
        if (localize == null) {
            return key;
        }
        return localize.Value;
    };
    LocalizationService.prototype.getResourceSet = function () {
        var url = this.baseUrl + "/GetResources";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    LocalizationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, core_1.Injector])
    ], LocalizationService);
    return LocalizationService;
}(baseService_1.BaseService));
exports.LocalizationService = LocalizationService;
//# sourceMappingURL=localizationService.js.map