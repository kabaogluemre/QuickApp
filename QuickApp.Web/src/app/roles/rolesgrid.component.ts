import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BaseComponent } from '@shared/base.component';
import { RoleService } from "../services/roleService";
import { RoleDto } from '../models/role/RoleDto'

import { CreateRoleComponent } from "./createrole/createrole.component";
import { ConfirmationDialog } from "@shared/directives/confirmationDialog.component";

import { NotificationConfig } from '@shared/models/notification/notificationConfig';
import { NotificationType } from '@shared/enums/notificationType';
import { NotificationService } from '@shared/services/notificationService'

import { ConfirmationDialogDto } from "@shared/models/directives/ConfirmationDialogDto";

@Component({
    selector: "roles-grid",
    templateUrl: '/src/app/roles/rolesgrid.component.html',
})
export class RolesGridComponent extends BaseComponent implements OnInit {

    roles: RoleDto[];
    @ViewChild('createRoleModal') createRoleModal: ModalComponent;

    @ViewChild('deleteRoleConfirmationDialog') deleteRoleConfirmationDialog: ConfirmationDialog;

    @ViewChild(CreateRoleComponent) createRoleForm: CreateRoleComponent;

    ngOnInit(): void {
        this.loadRoles();
    }
    constructor(injector: Injector,private roleService:RoleService) {
        super(injector);
    }
    loadRoles(): void {
        this.setUIBusy();
        this.roleService.GetRoles()
            .subscribe(
                result => {
                    this.roles = result.Roles;
                    this.removeUIBusy();
                });
    }
    createRole(roleId?:number): void {
        this.createRoleForm.setRoleAsEmpty();
        this.createRoleForm.setRole(roleId);
        this.createRoleModal.open();
    }
    deleteRole(roleId: number): void {
        this.deleteRoleConfirmationDialog.open(new ConfirmationDialogDto(this.loc('RemoveRole'), this.loc('DoYouWantToRemoveRole')), roleId);
    }
    removeRoleConfirmation(userId: number): void {
        this.roleService.DeleteRole(userId)
            .subscribe(
                result => {
                    NotificationService.show(new NotificationConfig(this.loc('Success'), this.loc('RoleDeletedSuccessfuly'), NotificationType.Success));
                    this.loadRoles();
                });
    }
}