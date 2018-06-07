import { PermissionDto } from "@shared/models/session/permissionDto";
import { BaseApiOutput } from '../BaseApiOutput'

export class GetPermissionsOutput extends BaseApiOutput {
    Permissions: PermissionDto[]
}