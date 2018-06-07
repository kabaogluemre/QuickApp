using System.Collections.Generic;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.DIContainer;
using System.Linq;
using QuickApp.Core.Attributes;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Exceptions;

namespace QuickApp.Core.Authorization
{
    public class RoleManager : IRoleManager, ITransientDependency
    {
        private readonly IPermissionManager _permissionManager;
        private readonly IRoleRepository _roleRepository;
        private readonly IRolePermissionRepository _rolePermissionRepository;

        public RoleManager(
            IRoleRepository roleRepository, 
            IRolePermissionRepository rolePermissionRepository, 
            IPermissionManager permissionManager)
        {
            _roleRepository = roleRepository;
            _rolePermissionRepository = rolePermissionRepository;
            _permissionManager = permissionManager;
        }
        public Role Get(int roleId)
        {
            return _roleRepository.GetIsActive(roleId);
        }
        [UnitOfWork]
        public void SetGrantedPermissions(int roleId, List<PermissionDto> grantedPermissions)
        {
            var currentPermissionList = GetGrantedPermissions(roleId);
            var deniedPermissions = currentPermissionList.Where(x => grantedPermissions.All(g => g.Name != x.Name))
                .ToList();
            foreach (var deniedPermission in deniedPermissions)
            {
                DenyPermission(roleId,deniedPermission);
            }
            var grantPermissions = grantedPermissions.Where(x => currentPermissionList.All(g => g.Name != x.Name));
            foreach (var grantPermission in grantPermissions)
            {
                GrantPermission(roleId,grantPermission);
            }
        }
        public void GrantPermission(int roleId, PermissionDto permission)
        {
            if (IsGranted(roleId, permission.Name))
            {
                return;
            }
            if (permission.Default)
            {
                _rolePermissionRepository.RemovePermission(roleId, permission.Name, false);
            }
            else
            {
                _rolePermissionRepository.AddPermission(roleId, permission.Name, true);
            }
        }
        public void DenyPermission(int roleId, PermissionDto permission)
        {
            if (!IsGranted(roleId, permission.Name))
            {
                return;
            }
            if (permission.Default)
            {
                _rolePermissionRepository.AddPermission(roleId,permission.Name,false);
            }
            else
            {
                _rolePermissionRepository.RemovePermission(roleId, permission.Name, true);
            }
        }
        [UnitOfWork]
        public void SetGrantedPermissions(int roleId, List<string> grantedPermissions)
        {
            var permissionList = ValidateCurrentPermissions(grantedPermissions);
            SetGrantedPermissions(roleId, permissionList);
        }
        private List<PermissionDto> ValidateCurrentPermissions(List<string> grantedPermissions)
        {
            var allPermissions = _permissionManager.GetAllPermissions();
            var grantedPermissionsDto = allPermissions.Where(x => grantedPermissions.Contains(x.Name)).ToList();
            if (grantedPermissionsDto.Count != grantedPermissions.Count)
            {
                throw new UserFriendlyException("There are undefined permissions on the permission list !");
            }
            return grantedPermissionsDto;
        }
        [UnitOfWork]
        public List<PermissionDto> GetGrantedPermissions(int roleId,bool getAllPermissions = false)
        {
            var grantedPermissions = new List<PermissionDto>();
            var allPermissions = _permissionManager.GetAllPermissions();
            foreach (var permission in allPermissions)
            {
                if (IsGranted(roleId, permission.Name))
                {
                    permission.Granted = true;
                    grantedPermissions.Add(permission);
                }
                else
                {
                    if (getAllPermissions)
                    {
                        permission.Granted = false;
                        grantedPermissions.Add(permission);
                    }
                }
            }
            return grantedPermissions;
        }
        //It could be better to provide cache mechanism
        public bool IsGranted(int roleId, string permissionName)
        {
            var rolePermission =
                _rolePermissionRepository.FirstOrDefault(x => x.RoleId == roleId && x.PermissionName == permissionName);
            if (rolePermission != null)
            {
                return rolePermission.IsGranted;
            }
            return _permissionManager.GetPermission(permissionName).Default;
        }
    }
}
