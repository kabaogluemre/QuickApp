"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var userService_1 = require("../../services/userService");
var roleService_1 = require("../../services/roleService");
var UserDto_1 = require("../../models/user/Dto/UserDto");
var base_component_1 = require("@shared/base.component");
var notificationConfig_1 = require("@shared/models/notification/notificationConfig");
var notificationType_1 = require("@shared/enums/notificationType");
var notificationService_1 = require("@shared/services/notificationService");
var CreateUserComponent = /** @class */ (function (_super) {
    __extends(CreateUserComponent, _super);
    function CreateUserComponent(_userService, _roleService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._userService = _userService;
        _this._roleService = _roleService;
        _this.user = new UserDto_1.UserDto();
        _this.isEdit = false;
        _this.formAfterSave = new core_1.EventEmitter();
        return _this;
    }
    CreateUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._roleService.GetRoles()
            .subscribe(function (result) {
            _this.roles = result.Roles;
        });
    };
    CreateUserComponent.prototype.isSelected = function (roleId) {
        if (this.user.Roles != null) {
            return this.user.Roles.filter(function (x) { return x.Id === roleId; })[0] != null;
        }
        return false;
    };
    CreateUserComponent.prototype.save = function () {
        var _this = this;
        this.user.Roles = [];
        var options = this.selectElRef.nativeElement.options;
        var _loop_1 = function (i) {
            if (options[i].selected) {
                var role = this_1.roles.filter(function (x) { return x.Id === parseInt(options[i].value); })[0];
                if (role) {
                    this_1.user.Roles.push(role);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < options.length; i++) {
            _loop_1(i);
        }
        this._userService.CreateUser(this.user)
            .subscribe(function (result) {
            notificationService_1.NotificationService.show(new notificationConfig_1.NotificationConfig(_this.loc('Success'), _this.loc('UserSavedSuccessfuly'), notificationType_1.NotificationType.Success));
            //Fire event 
            _this.formAfterSave.emit(null);
        });
    };
    ;
    CreateUserComponent.prototype.setUser = function (userId) {
        var _this = this;
        this._userService.GetUser(userId)
            .subscribe(function (result) {
            _this.user = result.User;
            _this.isEdit = true;
        });
    };
    CreateUserComponent.prototype.setUserAsEmpty = function () {
        this.user = new UserDto_1.UserDto();
        this.isEdit = false;
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CreateUserComponent.prototype, "formAfterSave", void 0);
    __decorate([
        core_1.ViewChild('roleSelect'),
        __metadata("design:type", Object)
    ], CreateUserComponent.prototype, "selectElRef", void 0);
    CreateUserComponent = __decorate([
        core_1.Component({
            selector: 'create-user-form',
            templateUrl: '/src/app/users/createuser/createuser.component.html'
        }),
        __metadata("design:paramtypes", [userService_1.UserService,
            roleService_1.RoleService,
            core_1.Injector])
    ], CreateUserComponent);
    return CreateUserComponent;
}(base_component_1.BaseComponent));
exports.CreateUserComponent = CreateUserComponent;
//# sourceMappingURL=createuser.component.js.map