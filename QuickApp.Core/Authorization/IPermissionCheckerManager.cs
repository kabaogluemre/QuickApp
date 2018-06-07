using System.Collections.Generic;

namespace QuickApp.Core.Authorization
{
    public interface IPermissionCheckerManager
    {
        bool IsGranted(string permissionName);

        List<PermissionDto> GetGrantedPermissions();
    }
}
