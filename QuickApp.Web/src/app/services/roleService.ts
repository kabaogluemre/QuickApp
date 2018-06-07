import { Injectable,Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConsts } from '@shared/appconsts';

import { BaseService } from '@shared/services/baseService'
import { GetRolesOutput } from '../models/role/GetRolesOutput'
import { GetRoleOutput } from '../models/role/GetRoleOutput'
import { CreateRoleOutput } from '../models/role/CreateRoleOutput'
import { DeleteRoleOutput } from '../models/role/DeleteRoleOutput'
import { GetPermissionsOutput } from '../models/role/GetPermissionsOutput'
import { RoleDto } from '../models/role/RoleDto';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class RoleService extends BaseService {
    baseUrl: string = AppConsts.BASE_ROLE_ENDPOINT;
    constructor(private _http: Http,injector:Injector) {
        super(injector);
    }
    GetRoles(): Observable<GetRolesOutput> {
        let url = this.baseUrl + "/GetRoles";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map((response: Response) => {
                return <GetRolesOutput>response.json();
            })
            .catch(this.handleError);
    }
    GetRole(roleId:number): Observable<GetRoleOutput> {
        let url = this.baseUrl + "/GetRole";
        var options = this.preparePostRequest({RoleId:roleId});
        return this._http.request(url, options)
            .map((response: Response) => {
                return <GetRoleOutput>response.json();
            })
            .catch(this.handleError);
    }
    CreateRole(role: RoleDto,grantedPermissions:string[]): Observable<CreateRoleOutput> {
        let url = this.baseUrl + "/CreateRole";
        var options = this.preparePostRequest({ role: role,grantedPermissions:grantedPermissions });
        return this._http.request(url, options)
            .map((response: Response) => {
                return <CreateRoleOutput>response.json();
            })
            .catch(this.handleError);
    }
    DeleteRole(roleId: number): Observable<DeleteRoleOutput> {
        let url = this.baseUrl + "/DeleteRole";
        var options = this.preparePostRequest({ RoleId: roleId });
        return this._http.request(url, options)
            .map((response: Response) => {
                return <DeleteRoleOutput>response.json();
            })
            .catch(this.handleError);
    }
    GetPermissions(): Observable<GetPermissionsOutput> {
        let url = this.baseUrl + "/GetPermissions";
        var options = this.prepareGetRequest();
        return this._http.request(url, options)
            .map((response: Response) => {
                return <GetPermissionsOutput>response.json();
            })
            .catch(this.handleError);
    }
}