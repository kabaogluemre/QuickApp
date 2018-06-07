using System.Collections.Generic;
using QuickApp.Core.Dto.Role;

namespace QuickApp.Core.Services
{
    public interface IRoleService
    {
        List<RoleDto> GetRoles();

        RoleDto GetRole(int roleId);

        void CreateRole(RoleDto role, List<string> grantedPermissions = null);

        void DeleteRole(int roleId);
    }
}
