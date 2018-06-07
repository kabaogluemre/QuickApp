using System.Linq;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;

namespace QuickApp.EntityFramework.EntityFramework.Repositories
{
    public class EfRolePermissionRepository : BaseRepository<RolePermission, int>, IRolePermissionRepository
    {
        public void AddPermission(int roleId, string permissionName, bool isGranted)
        {
            var existRecord = Table.FirstOrDefault(x =>
                x.PermissionName == permissionName && x.RoleId == roleId);
            if (existRecord != null && existRecord.IsGranted == isGranted)
            {
                return;
            }
            else if (existRecord != null)
            {
                existRecord.IsGranted = isGranted;
                Update(existRecord);
            }
            else
            {
                var newRecord = new RolePermission
                {
                    IsGranted = isGranted,
                    PermissionName = permissionName,
                    RoleId = roleId
                };
                Insert(newRecord);
            }
        }
        public void RemovePermission(int roleId, string permissionName, bool isGranted)
        {
            var existRecord = Table.FirstOrDefault(x =>
                x.PermissionName == permissionName && x.RoleId == roleId && x.IsGranted == isGranted);
            if (existRecord != null)
            {
                Delete(existRecord);
            }
        }
    }
}
