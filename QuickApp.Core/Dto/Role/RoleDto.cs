using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using QuickApp.Core.Authorization;

namespace QuickApp.Core.Dto.Role
{
    public class RoleDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<PermissionDto> GrantedPermissions { get; set; }
    }
}
