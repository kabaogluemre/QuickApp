import { ModuleWithProviders,NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuard } from '@shared/auth/route-guard';

import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, canActivate: [RouteGuard], data: { permission: 'QuickApp.Pages.Home' } },
                    { path: 'users', component: UsersComponent, canActivate: [RouteGuard], data: { permission: 'QuickApp.Pages.Users' }  },
                    { path: 'roles', component: RolesComponent, canActivate: [RouteGuard], data: { permission: 'QuickApp.Pages.Roles' }  }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }