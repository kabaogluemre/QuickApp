import { Component, ViewEncapsulation,Injector } from '@angular/core';

import { BaseComponent } from '@shared/base.component';

import { LoginInputModel } from '../models/login/loginInputModel';
import { AuthenticationInput } from '../models/authenticationInput';

import { LoginService } from '../services/loginService';


@Component({
    templateUrl: '/src/account/login/login.component.html',
    styleUrls: [
        '../metronic/admin/layout/css/login.css'
    ]
})
export class LoginComponent extends BaseComponent {
    loginModel: LoginInputModel = new LoginInputModel();
    submitDisabled:boolean=false;
    constructor(injector: Injector, private loginService:LoginService) {
        super(injector);
    }
    login(): void
    {
        var authenticationInput: AuthenticationInput = {
            GrantType : "password",
            Username: this.loginModel.Username,
            Password: this.loginModel.Password,
            ClientId: !this.loginModel.Rememberme ? "AngularApp" : "AngularApp-RememberMe",//It could be better to retrieve them from server side
            ClientSecret: !this.loginModel.Rememberme ? "9z5bRzBEyJCE3fAz" : "yurZ3YE3nGQk5DGW"
        };
        this.submitDisabled = true;
        this.loginService.authenticate(authenticationInput, () => this.submitDisabled = false);
    }
}