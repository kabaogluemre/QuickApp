using System.Collections.Generic;
using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Authorization
{
    public interface IRoleManager
    {
        Role Get(int roleId);

        bool IsGranted(int roleId, string permissionName);

        List<PermissionDto> GetGrantedPermissions(int roleId, bool getAllPermissions = false);

        void SetGrantedPermissions(int roleId, List<PermissionDto> grantedPermissions);

        void GrantPermission(int roleId, PermissionDto permission);

        void DenyPermission(int roleId, PermissionDto permission);

        void SetGrantedPermissions(int roleId, List<string> grantedPermissions);
    }
}
