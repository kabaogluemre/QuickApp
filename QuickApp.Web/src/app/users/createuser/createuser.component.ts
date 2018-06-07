import { Component, ViewChild, EventEmitter, Output, Injector, OnInit } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { UserService } from '../../services/userService';
import { RoleService } from "../../services/roleService";

import { UserDto } from '../../models/user/Dto/UserDto';
import { RoleDto } from '../../models/role/RoleDto';


import { BaseComponent } from '@shared/base.component';

import { NotificationConfig } from '@shared/models/notification/notificationConfig';
import { NotificationType } from '@shared/enums/notificationType';
import { NotificationService } from '@shared/services/notificationService'


@Component({
    selector:'create-user-form',
    templateUrl: '/src/app/users/createuser/createuser.component.html'
})
export class CreateUserComponent extends BaseComponent implements OnInit {

    user: UserDto = new UserDto();
    roles: RoleDto[];
    isEdit: boolean = false;

    @Output() formAfterSave: EventEmitter<any> = new EventEmitter();
    @ViewChild('roleSelect') selectElRef : any;

    constructor(
        private _userService: UserService,
        private _roleService: RoleService,
        injector: Injector) {
        super(injector);
    }
    ngOnInit(): void {
        this._roleService.GetRoles()
            .subscribe(
                result => {
                    this.roles = result.Roles;
                });
    }
    isSelected(roleId: number) {
        if (this.user.Roles != null) {
            return this.user.Roles.filter(x => x.Id === roleId)[0] != null;
        }
        return false;
    }
    save(): void {
        this.user.Roles = [];
        let options = this.selectElRef.nativeElement.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = this.roles.filter(x => x.Id === parseInt(options[i].value))[0];
                if (role) {
                    this.user.Roles.push(role);   
                }
            }
        }
        this._userService.CreateUser(this.user)
            .subscribe(
            result => {
                NotificationService.show(
                new NotificationConfig(this.loc('Success'), 
                this.loc('UserSavedSuccessfuly'), 
                NotificationType.Success));
                //Fire event 
                this.formAfterSave.emit(null);
            });
    };
    setUser(userId:number): void
    {
        this._userService.GetUser(userId)
            .subscribe(
            result => {
                this.user = result.User;
                this.isEdit = true;
            });
    }
    setUserAsEmpty(): void {
        this.user = new UserDto();
        this.isEdit = false;
    }
}