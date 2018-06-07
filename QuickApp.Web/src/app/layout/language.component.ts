import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { BaseComponent } from '@shared/base.component';
import { LanguageInfoDto } from "@shared/models/session/languageInfoDto";
import { CookieUtil } from '@shared/utils/cookieUtil'
import { AppConsts } from '@shared/appconsts';

@Component({
    selector: 'language-component',
    templateUrl: '/src/app/layout/language.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LanguageComponent extends BaseComponent {
    private cookieUtil:CookieUtil;
    constructor(injector: Injector) {
        super(injector);
        this.cookieUtil = injector.get(CookieUtil);
    }
    changeLanguage(language: LanguageInfoDto): void {
        this.cookieUtil.setCookie(
            AppConsts.LANGUAGE_COOKIE_KEY,
            language.LanguageCode,
            new Date(new Date().getTime() + 10 * 365 * 86400000));//10 years
        window.location.reload();
    }
}