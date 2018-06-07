using System.Collections.Generic;

namespace QuickApp.Core.Authorization
{
    public interface IPermissionManager
    {
        void Initialize();

        PermissionDto GetPermission(string name);

        List<PermissionDto> GetAllPermissions();
    }
}
