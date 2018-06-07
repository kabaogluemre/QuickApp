using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using QuickApp.Core.Exceptions;
using QuickApp.Core.Extensions;

namespace QuickApp.Core.Authorization
{
    public abstract class PermissionContext : IPermissionContext
    {
        private readonly Dictionary<string, Permission> _permissions;

        private readonly List<PermissionDto> _permissionList;

        protected PermissionContext()
        {
            _permissions = new Dictionary<string, Permission>();
            _permissionList = new List<PermissionDto>();
        }

        public Permission CreatePermission(string name, string descriptionKey, bool isGrantedByDefault = false)
        {
            var permission = new Permission(name, descriptionKey, isGrantedByDefault);
            _permissions.Add(name, permission);
            return permission;
        }

        public void PopulatePermissionList()
        {
            foreach (var permission in _permissions.Values)
            {
                AddPermissionsRecursively(permission);
            }
        }

        private void AddPermissionsRecursively(Permission permission)
        {
            var permissionDto = Mapper.Map<PermissionDto>(permission);
            if (_permissionList.Any(x => x.Name == permission.Name))
            {
                throw new UserFriendlyException("There is a permission which is already added with this same name : " + permission.Name);
            }
            _permissionList.Add(permissionDto);
            if (permission.Children == null || permission.Children.Count == 0)
            {
                return;
            }
            foreach (var permissionChild in permission.Children)
            {
                AddPermissionsRecursively(permissionChild);
            }
        }

        public PermissionDto GetPermission(string name)
        {
             return _permissionList.SingleOrDefault(x => x.Name == name);
        }

        public List<PermissionDto> GetAllPermissions()
        {
            return _permissionList.Clone();
        }
    }
}
