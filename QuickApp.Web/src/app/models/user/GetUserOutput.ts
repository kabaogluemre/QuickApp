import { BaseApiOutput } from '../BaseApiOutput'

import { UserDto } from './Dto/UserDto'

export class GetUserOutput extends BaseApiOutput {
    User: UserDto
}