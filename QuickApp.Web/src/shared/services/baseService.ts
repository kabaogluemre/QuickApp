import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { Injector } from '@angular/core';

import { MediaType } from '@shared/enums/media-type';

import { CookieUtil } from '@shared/utils/cookieUtil'
import { AuthConsts } from '@shared/auth/auth-consts'
import { ErrorModel } from '@shared/models/error/errorModel'
import { NotificationConfig } from '@shared/models/notification/notificationConfig'
import { NotificationType } from '@shared/enums/notificationType';
import { NotificationService } from '@shared/services/notificationService'

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

declare var Metronic: any;

export abstract class BaseService
{
    protected cookieUtil: CookieUtil;
    constructor(injector: Injector) {
        this.cookieUtil = injector.get(CookieUtil);
    }

    private createHeaders(contentType: string, accept: string, useAuthenticationHeader:boolean):Headers
    {
        let headers = new Headers({
            "Content-Type": contentType,
            "Accept": accept
        });
        if (useAuthenticationHeader) {
            var authToken = this.cookieUtil.getValueByKey(AuthConsts.CookieKey);
            if (authToken && authToken.length > 10) {
                headers.append("Authorization", "Bearer " + authToken);   
            }
        }
        return headers;
    }
    protected prepareGetRequest(contentType?: string, accept?: string, useAuthenticationHeader:boolean = true): any
    {
        if (contentType == null) {
            contentType = "application/json";
        }
        if (accept == null) {
            accept = "application/json";
        }
        let options: any = {
            method: "get",
            headers: this.createHeaders(contentType,accept,useAuthenticationHeader)
        };
        return options;
    };
    protected preparePostRequest(payload:object, contentType?:string, accept?:string, useAuthenticationHeader:boolean = true): any {
        let input = "";
        if (contentType == null) {
            contentType = MediaType.Json;
        }
        if (accept == null) {
            accept = MediaType.Json;
        }
        if (contentType == MediaType.Json){
            input = JSON.stringify(payload);
        }else{
            Object.keys(payload).forEach(key => input += key + "=" + payload[key] + "&");
            input = input.slice(0, -1);
        }
        let options: any = {
            body: input,
            method: "post",
            headers: this.createHeaders(contentType,accept,useAuthenticationHeader)
        };
        return options;
    };
    protected handleError(error: Response) {
        var errorModel = <ErrorModel>JSON.parse((error.text()) as any);
        if (errorModel.ErrorMessage == null) {
            errorModel.ErrorMessage = "UnexpectedError";
        }
        NotificationService.show(
            new NotificationConfig(
                "",
                errorModel.ErrorMessage,
                NotificationType.Error
            ));
        Metronic.unblockUI();
        if (error.status === 401) { //Unauthorized

        }
        return Observable.throw(error.json());
    };
    private processError(error: ErrorModel) {
        
    }
}