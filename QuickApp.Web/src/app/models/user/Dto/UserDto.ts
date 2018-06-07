import { RoleDto } from '../../role/RoleDto'

export class UserDto {
    Id: number;
    Username: string;
    Password: string;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    EmployeeNumber: string;
    Location: string;

    Roles:RoleDto[]
    
    constructor() {
        
    }
}