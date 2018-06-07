using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Data.Repositories
{
    public interface IRolePermissionRepository : IRepository<RolePermission, int>
    {
        void AddPermission(int roleId, string permissionName, bool isGranted);

        void RemovePermission(int roleId, string permissionName, bool isGranted);
    }
}
