"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var route_guard_1 = require("@shared/auth/route-guard");
var users_component_1 = require("./users/users.component");
var home_component_1 = require("./home/home.component");
var roles_component_1 = require("./roles/roles.component");
var app_component_1 = require("./app.component");
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: app_component_1.AppComponent,
                        children: [
                            { path: 'home', component: home_component_1.HomeComponent, canActivate: [route_guard_1.RouteGuard], data: { permission: 'QuickApp.Pages.Home' } },
                            { path: 'users', component: users_component_1.UsersComponent, canActivate: [route_guard_1.RouteGuard], data: { permission: 'QuickApp.Pages.Users' } },
                            { path: 'roles', component: roles_component_1.RolesComponent, canActivate: [route_guard_1.RouteGuard], data: { permission: 'QuickApp.Pages.Roles' } }
                        ]
                    }
                ])
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map