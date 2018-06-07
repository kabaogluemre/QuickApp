import { Injectable,Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConsts } from '../appconsts';

import { BaseService } from './baseService'

import { LocalizationDto } from '../models/localization/localizationDto'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class LocalizationService extends BaseService {
    baseUrl: string = AppConsts.BASE_LOCALIZATION_ENDPOINT;
    localizations:LocalizationDto[] = null;

    constructor(private _http: Http,injector:Injector) {
        super(injector);
    }
    init(): Promise<boolean>
    {
        return new Promise<boolean>((resolve, reject) => {
            this.getResourceSet().toPromise().then((result: LocalizationDto[]) => {
                this.localizations = result;
                resolve(true);
            }, (err) => {
                reject(err);
            });
        });
    }
    getLocalizedText(key: string): string {
        let localize = this.localizations.filter(x => x.Key == key)[0];
        if (localize == null)
        {
            return key;
        }
        return localize.Value;
    }
    getResourceSet(): Observable<LocalizationDto[]> {
        let url = this.baseUrl + "/GetResources";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map((response: Response) => {
                return <LocalizationDto[]>response.json();
            })
            .catch(this.handleError);
    }
}