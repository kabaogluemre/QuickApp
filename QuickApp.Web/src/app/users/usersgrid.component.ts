import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BaseComponent } from '@shared/base.component';

import { UserDto } from "../models/user/Dto/UserDto";
import { ConfirmationDialogDto } from "@shared/models/directives/ConfirmationDialogDto";

import { UserService } from "../services/userService";

import { CreateUserComponent } from "./createuser/createuser.component";
import { ConfirmationDialog } from "@shared/directives/confirmationDialog.component";

import { NotificationConfig } from '@shared/models/notification/notificationConfig';
import { NotificationType } from '@shared/enums/notificationType';
import { NotificationService } from '@shared/services/notificationService'

@Component({
    selector: "users-grid",
    templateUrl: '/src/app/users/usersgrid.component.html',
})
export class UsersGridComponent extends BaseComponent implements OnInit {

    @ViewChild('createUserModal') createUserModal: ModalComponent;

    @ViewChild('deleteUserConfirmationDialog') deleteUserConfirmationDialog: ConfirmationDialog;

    @ViewChild(CreateUserComponent) createUserForm: CreateUserComponent;

    users: UserDto[];
    errorMessage: string = "";
    constructor(private _userService: UserService, injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.LoadUsers();
    }
    LoadUsers(): void {
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
            .subscribe(
            result => {
                this.users = result.Users;
                this.removeUIBusy();
            });
    }
    CreateUser(userId?: number): void {
        this.createUserForm.setUserAsEmpty();
        if (userId != null)
        {
            this.createUserForm.setUser(userId);
        }
        this.createUserModal.open();
    }
    FormAfterSaveEvent(evt:any): void {
        //Close the modal and refresh the grid after form posted successfully
        this.LoadUsers();
        this.createUserModal.close();
    }
    DeleteUser(userId: number): void {
        this.deleteUserConfirmationDialog.open(new ConfirmationDialogDto(this.loc('RemoveUser'), this.loc('DoYouWantToRemoveUser')), userId);
    }
    RemoveUserConfirmation(userId:number): void {
        this._userService.DeleteUser(userId)
            .subscribe(
            result => {
                NotificationService.show(new NotificationConfig(this.loc('Success'), this.loc('UserDeletedSuccessfuly'), NotificationType.Success));
                this.LoadUsers();
            });
    }
}