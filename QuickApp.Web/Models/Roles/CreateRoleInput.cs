using System;
using System.Collections.Generic;
using QuickApp.Core.Dto.Role;
using QuickApp.Core.Dto.User;
using QuickApp.Web.Controls;

namespace QuickApp.Web.Models.Roles
{
    public class CreateRoleInput : IInputValidatable
    {
        public RoleDto Role { get;set;}

        public List<string> GrantedPermissions { get; set; }

        public void Validate()
        {
            if (Role == null)
            {
                throw new Exception("Role object is required ! ");
            }
        }
    }
}