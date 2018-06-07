using System.Collections.Generic;
using QuickApp.Core.Dto.Role;
using QuickApp.Web.Core.Models;

namespace QuickApp.Web.Models.Roles
{
    public class GetRolesOutput : BaseApiOutput
    {
        public List<RoleDto> Roles { get; set; }
    }
}