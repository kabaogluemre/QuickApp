using System.Collections.Generic;
using QuickApp.Core.Authorization;

namespace QuickApp.Core.Dto.User
{
    public class UserSessionInfoDto
    {
        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailAddress { get; set; }

        public string Location { get; set; }

        public List<PermissionDto> GrantedPermissions { get; set; }
    }
}
