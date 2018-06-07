using System.Collections.Generic;

namespace QuickApp.Core.Authorization
{
    public interface IPermissionContext
    {
        Permission CreatePermission(string name, string descriptionKey, bool isGrantedByDefault = false);

        PermissionDto GetPermission(string name);

        List<PermissionDto> GetAllPermissions();
    }
}
