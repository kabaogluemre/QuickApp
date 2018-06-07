using System.Collections.Generic;
using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Authorization
{
    public interface IUserManager
    {
        List<PermissionDto> GetGrantedPermissions(int userId);

        User Get(int userId);

        bool IsGranted(int userId, string permissionName);
    }
}
