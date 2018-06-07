import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';

//Layout
import { SideBarFooterComponent } from './layout/sidebar-footer.component';
import { SideBarNavComponent } from './layout/sidebar-nav.component';
import { TopBarComponent } from './layout/top-bar.component';
import { SideBarLeftComponent } from './layout/sidebar-left.component';
import { LanguageComponent } from './layout/language.component';


import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

import { UsersGridComponent } from './users/usersgrid.component';
import { RolesGridComponent } from './roles/rolesgrid.component';
import { CreateUserComponent } from './users/createuser/createuser.component';
import { CreateRoleComponent } from './roles/createrole/createrole.component';

//Inject them
import { UserService } from './services/userService';
import { RoleService } from './services/roleService';


//Shared Module
import { SharedModule } from '@shared/shared.module'



@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule,
        Ng2Bs3ModalModule],
    declarations: [
        AppComponent,
        HomeComponent,
        UsersComponent,
        SideBarFooterComponent,
        SideBarNavComponent,
        TopBarComponent,
        SideBarLeftComponent,
        UsersGridComponent,
        CreateUserComponent,
        LanguageComponent,
        RolesComponent,
        RolesGridComponent,
        CreateRoleComponent
    ],
    providers:
    [
        { provide: APP_BASE_HREF, useValue: '/' },
        UserService,
        RoleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }