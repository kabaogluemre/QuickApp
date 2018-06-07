using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using QuickApp.Core.Attributes;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Exceptions;

namespace QuickApp.Core.Authorization
{
    public class UserManager : IUserManager, ITransientDependency
    {
        private readonly IUserRepository _userRepository;
        private readonly IPermissionManager _permissionManager;
        private readonly RoleManager _roleManager;
        public UserManager(
            IUserRepository userRepository, 
            IPermissionManager permissionManager,
            RoleManager roleManager)
        {
            _userRepository = userRepository;
            _permissionManager = permissionManager;
            _roleManager = roleManager;
        }
        [UnitOfWork]
        public User Get(int userId)
        {
            return _userRepository.GetIsActive(userId);
        }
        [UnitOfWork]
        public List<PermissionDto> GetGrantedPermissions(int userId)
        {
            var grantedPermissions = new List<PermissionDto>();
            var allPermissions = _permissionManager.GetAllPermissions();
            foreach (var permission in allPermissions)
            {
                if (IsGranted(userId, permission.Name))
                {
                    permission.Granted = true;
                    grantedPermissions.Add(permission);
                }
            }
            return grantedPermissions;
        }
        [UnitOfWork]
        public bool IsGranted(int userId, string permissionName)
        {
            var user = Get(userId);
            if (user == null)
            {
                throw new UserFriendlyException("There is no user found with this id : " + userId);
            }
            var roles = user.Roles.Where(x => x.IsActive);
            foreach (var role in roles)
            {
                if (_roleManager.IsGranted(role.Id, permissionName))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
