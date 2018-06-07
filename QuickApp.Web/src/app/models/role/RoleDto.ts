import { PermissionDto } from "@shared/models/session/permissionDto";
export class RoleDto {
    Id:number;
    Name:string;
    GrantedPermissions:PermissionDto[];
}