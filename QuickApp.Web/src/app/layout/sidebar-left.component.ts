import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { BaseComponent } from '@shared/base.component';

@Component({
    selector: 'sidebar-left',
    templateUrl: '/src/app/layout/sidebar-left.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SideBarLeftComponent extends BaseComponent {
    constructor(injector: Injector) {
        super(injector);
    }
}