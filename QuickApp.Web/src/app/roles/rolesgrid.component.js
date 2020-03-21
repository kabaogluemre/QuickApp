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
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var base_component_1 = require("@shared/base.component");
var roleService_1 = require("../services/roleService");
var createrole_component_1 = require("./createrole/createrole.component");
var confirmationDialog_component_1 = require("@shared/directives/confirmationDialog.component");
var notificationConfig_1 = require("@shared/models/notification/notificationConfig");
var notificationType_1 = require("@shared/enums/notificationType");
var notificationService_1 = require("@shared/services/notificationService");
var ConfirmationDialogDto_1 = require("@shared/models/directives/ConfirmationDialogDto");
var RolesGridComponent = /** @class */ (function (_super) {
    __extends(RolesGridComponent, _super);
    function RolesGridComponent(injector, roleService) {
        var _this = _super.call(this, injector) || this;
        _this.roleService = roleService;
        return _this;
    }
    RolesGridComponent.prototype.ngOnInit = function () {
        this.loadRoles();
    };
    RolesGridComponent.prototype.loadRoles = function () {
        var _this = this;
        this.setUIBusy();
        this.roleService.GetRoles()
            .subscribe(function (result) {
            _this.roles = result.Roles;
            _this.removeUIBusy();
        });
    };
    RolesGridComponent.prototype.createRole = function (roleId) {
        this.createRoleForm.setRoleAsEmpty();
        this.createRoleForm.setRole(roleId);
        this.createRoleModal.open();
    };
    RolesGridComponent.prototype.deleteRole = function (roleId) {
        this.deleteRoleConfirmationDialog.open(new ConfirmationDialogDto_1.ConfirmationDialogDto(this.loc('RemoveRole'), this.loc('DoYouWantToRemoveRole')), roleId);
    };
    RolesGridComponent.prototype.removeRoleConfirmation = function (userId) {
        var _this = this;
        this.roleService.DeleteRole(userId)
            .subscribe(function (result) {
            notificationService_1.NotificationService.show(new notificationConfig_1.NotificationConfig(_this.loc('Success'), _this.loc('RoleDeletedSuccessfuly'), notificationType_1.NotificationType.Success));
            _this.loadRoles();
        });
    };
    __decorate([
        core_1.ViewChild('createRoleModal'),
        __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
    ], RolesGridComponent.prototype, "createRoleModal", void 0);
    __decorate([
        core_1.ViewChild('deleteRoleConfirmationDialog'),
        __metadata("design:type", confirmationDialog_component_1.ConfirmationDialog)
    ], RolesGridComponent.prototype, "deleteRoleConfirmationDialog", void 0);
    __decorate([
        core_1.ViewChild(createrole_component_1.CreateRoleComponent),
        __metadata("design:type", createrole_component_1.CreateRoleComponent)
    ], RolesGridComponent.prototype, "createRoleForm", void 0);
    RolesGridComponent = __decorate([
        core_1.Component({
            selector: "roles-grid",
            templateUrl: '/src/app/roles/rolesgrid.component.html',
        }),
        __metadata("design:paramtypes", [core_1.Injector, roleService_1.RoleService])
    ], RolesGridComponent);
    return RolesGridComponent;
}(base_component_1.BaseComponent));
exports.RolesGridComponent = RolesGridComponent;
//# sourceMappingURL=rolesgrid.component.js.map