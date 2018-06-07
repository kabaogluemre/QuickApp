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
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var base_component_1 = require("@shared/base.component");
var ConfirmationDialogDto_1 = require("@shared/models/directives/ConfirmationDialogDto");
var userService_1 = require("../services/userService");
var createuser_component_1 = require("./createuser/createuser.component");
var confirmationDialog_component_1 = require("@shared/directives/confirmationDialog.component");
var notificationConfig_1 = require("@shared/models/notification/notificationConfig");
var notificationType_1 = require("@shared/enums/notificationType");
var notificationService_1 = require("@shared/services/notificationService");
var UsersGridComponent = /** @class */ (function (_super) {
    __extends(UsersGridComponent, _super);
    function UsersGridComponent(_userService, injector) {
        var _this = _super.call(this, injector) || this;
        _this._userService = _userService;
        _this.errorMessage = "";
        return _this;
    }
    UsersGridComponent.prototype.ngOnInit = function () {
        this.LoadUsers();
    };
    UsersGridComponent.prototype.LoadUsers = function () {
        var _this = this;
        //this.users = [{
        //    FirstName : "Emre",
        //    LastName :"Kabaoğlu",
        //    EmailAddress : "admin@admin.com",
        //    EmployeeNumber : "123",
        //    Id : 1,
        //    Location : "Ankara"
        //},
        //{
        //    FirstName: "Emre",
        //    LastName: "Kabaoğlu",
        //    EmailAddress: "admin@admin.com",
        //    EmployeeNumber: "123",
        //    Id: 1,
        //    Location: "Ankara"
        //},
        //{
        //    FirstName: "Emre",
        //    LastName: "Kabaoğlu",
        //    EmailAddress: "admin@admin.com",
        //    EmployeeNumber: "123",
        //    Id: 1,
        //    Location: "Ankara"
        //}
        //];
        this.setUIBusy();
        this._userService.GetUsers()
            .subscribe(function (result) {
            _this.users = result.Users;
            _this.removeUIBusy();
        });
    };
    UsersGridComponent.prototype.CreateUser = function (userId) {
        this.createUserForm.setUserAsEmpty();
        if (userId != null) {
            this.createUserForm.setUser(userId);
        }
        this.createUserModal.open();
    };
    UsersGridComponent.prototype.FormAfterSaveEvent = function (evt) {
        //Close the modal and refresh the grid after form posted successfully
        this.LoadUsers();
        this.createUserModal.close();
    };
    UsersGridComponent.prototype.DeleteUser = function (userId) {
        this.deleteUserConfirmationDialog.open(new ConfirmationDialogDto_1.ConfirmationDialogDto(this.loc('RemoveUser'), this.loc('DoYouWantToRemoveUser')), userId);
    };
    UsersGridComponent.prototype.RemoveUserConfirmation = function (userId) {
        var _this = this;
        this._userService.DeleteUser(userId)
            .subscribe(function (result) {
            notificationService_1.NotificationService.show(new notificationConfig_1.NotificationConfig(_this.loc('Success'), _this.loc('UserDeletedSuccessfuly'), notificationType_1.NotificationType.Success));
            _this.LoadUsers();
        });
    };
    __decorate([
        core_1.ViewChild('createUserModal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], UsersGridComponent.prototype, "createUserModal", void 0);
    __decorate([
        core_1.ViewChild('deleteUserConfirmationDialog'),
        __metadata("design:type", confirmationDialog_component_1.ConfirmationDialog)
    ], UsersGridComponent.prototype, "deleteUserConfirmationDialog", void 0);
    __decorate([
        core_1.ViewChild(createuser_component_1.CreateUserComponent),
        __metadata("design:type", createuser_component_1.CreateUserComponent)
    ], UsersGridComponent.prototype, "createUserForm", void 0);
    UsersGridComponent = __decorate([
        core_1.Component({
            selector: "users-grid",
            templateUrl: '/src/app/users/usersgrid.component.html',
        }),
        __metadata("design:paramtypes", [userService_1.UserService, core_1.Injector])
    ], UsersGridComponent);
    return UsersGridComponent;
}(base_component_1.BaseComponent));
exports.UsersGridComponent = UsersGridComponent;
//# sourceMappingURL=usersgrid.component.js.map