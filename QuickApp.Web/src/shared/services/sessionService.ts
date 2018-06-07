import { Injectable,Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConsts } from '../appconsts';

import { BaseService } from './baseService'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { GetCurrentInfoOutput } from "@shared/models/session/getCurrentInfoOutput";
import { UserSessionInfoDto } from "@shared/models/session/userSessionInfoDto";
import { LanguageInfoDto } from "@shared/models/session/languageInfoDto";

@Injectable()
export class SessionService extends BaseService {
    baseUrl: string = AppConsts.BASE_SESSION_ENDPOINT;
    currentUser: UserSessionInfoDto = null;
    languages: LanguageInfoDto[];
    currentLanguage: LanguageInfoDto;
    constructor(private http: Http, injector: Injector) {
        super(injector);
    }
    init(): Promise<boolean>
    {
        return new Promise<boolean>((resolve, reject) => {
            this.getCurrentInfo().toPromise().then((result: GetCurrentInfoOutput) => {
                this.currentUser = result.CurrentUser;
                this.languages = result.Languages;
                let currentLanguageCode = this.cookieUtil.getValueByKey(AppConsts.LANGUAGE_COOKIE_KEY);
                if (!currentLanguageCode) {
                    currentLanguageCode = 'en-EN';
                }
                this.currentLanguage = this.languages.filter(x => x.LanguageCode === currentLanguageCode)[0];
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
    isGranted(permissionName: string): boolean {
        return this.currentUser.GrantedPermissions.filter(x => x.Name === permissionName && x.Granted).length > 0;
    }
    getCurrentInfo(): Observable<GetCurrentInfoOutput> {
        let url = this.baseUrl + "/GetCurrentInfo";
        var options = this.prepareGetRequest();
        return this.http.request(url, options)
            .map((response: Response) => {
                return <GetCurrentInfoOutput>response.json();
            })
            .catch(this.handleError);
    }
}