using System.Collections.Generic;
using QuickApp.Core.Dto.Role;

namespace QuickApp.Core.Dto.User
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailAddress { get; set; }

        public string EmployeeNumber { get; set; }

        public string Location { get; set; }

        public List<RoleDto> Roles { get; set; }
    }
}
