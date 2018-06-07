import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
    { path: '', redirectTo: '/app/home', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: '/src/account/account.module#AccountModule', //Lazy load account module
        data: { preload: true }
    },
    {
        path: 'app',
        loadChildren: '/src/app/app.module#AppModule', //Lazy load app module
        data: { preload: true }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule {
    constructor(router: Router, title: Title) {
        router.events.subscribe((event) => { //fires on every URL change
            //title.setTitle(router.url);
        });
    }
}