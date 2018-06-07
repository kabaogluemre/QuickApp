import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AccountRoutingModule } from './account.routing';

import { SharedModule } from '@shared/shared.module';

//Components
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';

import { LoginService } from './services/loginService';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent
    ],
    providers: [
        LoginService
    ]
})
export class AccountModule {

}
