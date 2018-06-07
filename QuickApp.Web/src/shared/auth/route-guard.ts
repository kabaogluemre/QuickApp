import { Injectable } from '@angular/core';
import { SessionService } from '@shared/services/sessionService';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private sessionService:SessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.sessionService.currentUser) {
            this.router.navigate(['/account/login']);
            return false;   
        }
        if (!route.data || !route.data["permission"]) {
            return true;
        }
        if (this.sessionService.isGranted(route.data["permission"])) {
            return true;
        }
        this.router.navigate([this.navigateToBestRoute()]);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    navigateToBestRoute(): string {
        return '/app/home';
    }
}