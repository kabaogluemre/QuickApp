import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable,Injector } from '@angular/core';

import { AppConsts } from '@shared/appconsts'
import { BaseService } from '@shared/services/baseService'
import { CookieUtil } from '@shared/utils/cookieUtil'
import { Http, Response } from '@angular/http';

import { AuthenticationInput } from '../models/authenticationInput';
import { AuthenticationResult } from '../models/authenticationResult';

import { MediaType } from '@shared/enums/media-type';
import { AuthConsts } from '@shared/auth/auth-consts';
import { ReturnUrlHelper } from '@shared/helper/returnUrlHelper';

import { NotificationConfig } from '@shared/models/notification/notificationConfig';
import { NotificationType } from '@shared/enums/notificationType';
import { NotificationService } from '@shared/services/notificationService'

import { LocalizationService } from '@shared/services/localizationService'

@Injectable()
export class LoginService extends BaseService
{
    baseUrl: string = AppConsts.BASE_TOKEN_ENDPOINT;
    constructor(
        private _http: Http,
        private _cookieUtil: CookieUtil,
        private _localizationService: LocalizationService,
        injector: Injector) {
        super(injector);
    }
    authenticate(input: AuthenticationInput, finallyCallback?: () => void): void
    {
        this.applyTokenRequest(input)
            .subscribe((result: AuthenticationResult) => {
                this.login(result);
                finallyCallback();
            });
    }
    private login(result: AuthenticationResult): void
    {
        if (result.IsSuccess)
        {
            //Login the user
            this._cookieUtil.removeByKey(AuthConsts.CookieKey);
            var expireDate = new Date();
            expireDate.setSeconds(expireDate.getMinutes() + (result.ExpiresIn - 120));
            this._cookieUtil.setCookie(AuthConsts.CookieKey, result.AccessToken, expireDate);

            var initialUrl = ReturnUrlHelper.initialUrl;
            if (initialUrl.indexOf('/login') > 0) {
                initialUrl = '/';
            }

            location.href = initialUrl;
        }
        else
        {
            NotificationService.show(new NotificationConfig(
                this._localizationService.getLocalizedText("InvalidLoginAttempt"),
                this._localizationService.getLocalizedText("UsernameOrPasswordWrong"),
                NotificationType.Error));
            //Provide a notification service and send a warning
            //Raise warning
        }
    }
    private applyTokenRequest(input: AuthenticationInput): Observable<AuthenticationResult>
    {
        let url = this.baseUrl;
        var options = this.preparePostRequest(
            {
                grant_type: input.GrantType,
                username: input.Username,
                password: input.Password,
                client_id: input.ClientId,
                client_secret: input.ClientSecret
            },
            MediaType.FormEncoded, MediaType.Json
        );
        return this._http.request(url, options)
            .map((response: Response) => {
                return this.processTokenRequest(response);
            })
            .catch((response: Response) => {
                return Observable.of(this.processTokenRequest(response));
            });
    }
    private processTokenRequest(response: Response): AuthenticationResult {
        var authenticationResult: AuthenticationResult = {
            AccessToken: "",
            ExpiresIn: 0,
            IsSuccess: false
        };
        if (response.status == 200) {
            var result = response.json();
            authenticationResult.IsSuccess = true;
            authenticationResult.AccessToken = result.access_token;
            authenticationResult.ExpiresIn = result.expires_in;
        }
        return authenticationResult;
    }
}