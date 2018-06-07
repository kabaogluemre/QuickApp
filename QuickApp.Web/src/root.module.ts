import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootRoutingModule } from './root-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@shared/shared.module';

import { RootComponent } from './root.component';

import { AppInitializer } from './appInitializer';

@NgModule({
    imports: [
        BrowserModule,
        RootRoutingModule,
        SharedModule.forRoot(),
        HttpModule],
    declarations: [
        RootComponent
    ],
    providers:
    [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
            provide: APP_INITIALIZER,
            useFactory: (injector: Injector) => () => AppInitializer.run(injector),
            deps: [Injector],
            multi: true
        }
    ],
    bootstrap: [RootComponent]
})
export class RootModule { }