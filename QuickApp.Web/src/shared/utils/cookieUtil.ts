import { Injectable } from '@angular/core'
import { CookieService, CookieOptions } from 'ngx-cookie';
import { AppConsts } from '../appconsts';

@Injectable()
export class CookieUtil
{
    constructor(private cookieService: CookieService) { }

    setCookie(key: string, value: string, expireDate: Date): void {
        var options: CookieOptions = {
            expires: expireDate,
            path : AppConsts.BASE_APP_ENDPOINT
        };
        this.cookieService.put(key, value, options);
    } 
    removeAllCookies(): void {
        this.cookieService.removeAll();
    }
    removeByKey(key: string): void {
        var options: CookieOptions = {
            path: AppConsts.BASE_APP_ENDPOINT
        };
        this.cookieService.remove(key, options);
    }
    getValueByKey(key: string): string {
        return this.cookieService.get(key);
    }
}