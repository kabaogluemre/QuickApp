using QuickApp.Core.Dto.Role;
using QuickApp.Web.Core.Models;

namespace QuickApp.Web.Models.Roles
{
    public class GetRoleOutput : BaseApiOutput
    {
        public RoleDto Role { get; set; }
    }
}