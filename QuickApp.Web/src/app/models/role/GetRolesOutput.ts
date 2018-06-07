import { RoleDto } from './RoleDto'
import { BaseApiOutput } from '../BaseApiOutput'

export class GetRolesOutput extends BaseApiOutput {
    Roles:RoleDto[]
}