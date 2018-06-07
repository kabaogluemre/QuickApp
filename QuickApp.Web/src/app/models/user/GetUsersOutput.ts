import { BaseApiOutput } from '../BaseApiOutput'

import { UserDto } from './Dto/UserDto'

export class GetUsersOutput extends BaseApiOutput
{
    Users:UserDto[]
}