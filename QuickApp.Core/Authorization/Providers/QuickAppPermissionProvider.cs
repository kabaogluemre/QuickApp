namespace QuickApp.Core.Authorization.Providers
{
    public class QuickAppPermissionProvider : IPermissionProvider
    {
        public void Initialize(IPermissionContext context)
        {
            var pages = context.CreatePermission(QuickAppPermissionNames.PermissionPages, "", true);
            pages.CreateChild(QuickAppPermissionNames.PermissionPagesHome, "",true);
            pages.CreateChild(QuickAppPermissionNames.PermissionPagesRoles, "")
                .CreateChild(QuickAppPermissionNames.PermissionCanCreateRoles,"");
            pages.CreateChild(QuickAppPermissionNames.PermissionPagesUsers, "")
                .CreateChild(QuickAppPermissionNames.PermissionCanCreateUsers,"");
        }
    }
}
