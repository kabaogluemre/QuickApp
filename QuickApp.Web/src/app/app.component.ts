import { Component, Injector } from '@angular/core';

import { BaseComponent } from '@shared/base.component';
@Component({
    templateUrl: '/src/app/app.component.html',
})
export class AppComponent extends BaseComponent {

    constructor(injector: Injector) {
        super(injector);
    }
}