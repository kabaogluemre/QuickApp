import { PermissionDto } from "@shared/models/session/permissionDto";
export class UserSessionInfoDto {
    Username: string;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    Location: string;
    GrantedPermissions: PermissionDto[];
    constructor() { }
}