import { Component, ViewEncapsulation,Injector } from '@angular/core';
import { BaseComponent } from '@shared/base.component';
import { CookieUtil } from '@shared/utils/cookieUtil';
import { AuthConsts } from '@shared/auth/auth-consts';
@Component({
    selector: 'sidebar-nav',
    templateUrl: '/src/app/layout/sidebar-nav.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends BaseComponent {
    constructor(injector: Injector, private cookieUtil: CookieUtil) {
        super(injector);
    }
    logout(): void
    {
        this.cookieUtil.removeByKey(AuthConsts.CookieKey);
        location.href = "/";
    }
}