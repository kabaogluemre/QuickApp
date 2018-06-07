using System.Web.Http;
using System.Web.Http.Controllers;
using QuickApp.Core.Authorization;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Exceptions;

namespace QuickApp.Web.Core.Authentication
{
    public class AppAuthorize : AuthorizeAttribute
    {
        private IPermissionCheckerManager _permissionCheckerManager;

        public AppAuthorize(params string[] permissions)
        {
            Permissions = permissions;
        }
        public string[] Permissions;

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);
            if (Permissions != null)
            {
                if (_permissionCheckerManager == null)
                {
                    _permissionCheckerManager = IocHelper.Resolve<IPermissionCheckerManager>();
                }
                foreach (var permission in Permissions)
                {
                    if (!_permissionCheckerManager.IsGranted(permission))
                    {
                        throw new UnAuthorizationException("You don't have sufficient rights for this permission. PermissionName : " + permission);
                    }
                }
            }
        }
    }
}
