"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_routing_1 = require("./app.routing");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var common_2 = require("@angular/common");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var app_component_1 = require("./app.component");
//Layout
var sidebar_footer_component_1 = require("./layout/sidebar-footer.component");
var sidebar_nav_component_1 = require("./layout/sidebar-nav.component");
var top_bar_component_1 = require("./layout/top-bar.component");
var sidebar_left_component_1 = require("./layout/sidebar-left.component");
var language_component_1 = require("./layout/language.component");
var home_component_1 = require("./home/home.component");
var users_component_1 = require("./users/users.component");
var roles_component_1 = require("./roles/roles.component");
var usersgrid_component_1 = require("./users/usersgrid.component");
var rolesgrid_component_1 = require("./roles/rolesgrid.component");
var createuser_component_1 = require("./users/createuser/createuser.component");
var createrole_component_1 = require("./roles/createrole/createrole.component");
//Inject them
var userService_1 = require("./services/userService");
var roleService_1 = require("./services/roleService");
//Shared Module
var shared_module_1 = require("@shared/shared.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                app_routing_1.AppRoutingModule,
                common_2.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                ng2_bs3_modal_1.Ng2Bs3ModalModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                users_component_1.UsersComponent,
                sidebar_footer_component_1.SideBarFooterComponent,
                sidebar_nav_component_1.SideBarNavComponent,
                top_bar_component_1.TopBarComponent,
                sidebar_left_component_1.SideBarLeftComponent,
                usersgrid_component_1.UsersGridComponent,
                createuser_component_1.CreateUserComponent,
                language_component_1.LanguageComponent,
                roles_component_1.RolesComponent,
                rolesgrid_component_1.RolesGridComponent,
                createrole_component_1.CreateRoleComponent
            ],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                userService_1.UserService,
                roleService_1.RoleService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map