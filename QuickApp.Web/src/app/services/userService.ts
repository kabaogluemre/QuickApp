import { Injectable,Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConsts } from '@shared/appconsts';

import { BaseService } from '@shared/services/baseService'
import { GetUsersOutput } from '../models/user/GetUsersOutput'
import { GetUserOutput } from '../models/user/GetUserOutput'
import { CreateUserOutput } from '../models/user/CreateUserOutput'
import { DeleteUserOutput } from '../models/user/DeleteUserOutput'

import { UserDto } from '../models/user/Dto/UserDto'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService extends BaseService {
    baseUrl: string = AppConsts.BASE_USER_ENDPOINT;
    constructor(private _http: Http,injector:Injector) {
        super(injector);
    }
    GetUsers(): Observable<GetUsersOutput> {
        let url = this.baseUrl + "/GetUsers";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map((response: Response) => {
                return <GetUsersOutput>response.json();
            })
            .catch(this.handleError);
    }
    GetUser(userId:number): Observable<GetUserOutput> {
        let url = this.baseUrl + "/GetUser";
        var options = this.preparePostRequest( { userId : userId });
        return this._http.request(url, options)
            .map((response: Response) => {
                return <GetUserOutput>response.json();
            })
            .catch(this.handleError);
    }
    CreateUser(user: UserDto): Observable<CreateUserOutput> {
        let url = this.baseUrl + "/CreateUser";
        var options = this.preparePostRequest({ user: user });
        return this._http.request(url, options)
            .map((response: Response) => {
                return <CreateUserOutput>response.json();
            })
            .catch(this.handleError);
    }
    DeleteUser(userId: number): Observable<DeleteUserOutput> {
        let url = this.baseUrl + "/DeleteUser";
        var options = this.preparePostRequest({ userId: userId });
        return this._http.request(url, options)
            .map((response: Response) => {
                return <DeleteUserOutput>response.json();
            })
            .catch(this.handleError);
    }
}