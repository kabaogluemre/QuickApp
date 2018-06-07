using System.Collections.Generic;
using QuickApp.Core.Attributes;
using QuickApp.Core.Authentication;
using QuickApp.Core.DIContainer;

namespace QuickApp.Core.Authorization
{
    public class PermissionCheckerManager : IPermissionCheckerManager, ITransientDependency
    {
        private readonly IUserManager _userManager;
        private readonly IAppSession _appSession;
        public PermissionCheckerManager(
            IAppSession appSession, 
            IUserManager userManager)
        {
            _appSession = appSession;
            _userManager = userManager;
        }
        [UnitOfWork]
        public bool IsGranted(string permissionName)
        {
            if (!_appSession.CurrentUserId.HasValue)
            {
                return false;
            }
            return _userManager.IsGranted(_appSession.CurrentUserId.Value, permissionName);
        }
        [UnitOfWork]
        public List<PermissionDto> GetGrantedPermissions()
        {
            if (!_appSession.CurrentUserId.HasValue)
            {
                return null;
            }
            return _userManager.GetGrantedPermissions(_appSession.CurrentUserId.Value);
        }
    }
}
