using System.Collections.Generic;
using QuickApp.Core.Authorization.Providers;
using QuickApp.Core.DIContainer;

namespace QuickApp.Core.Authorization
{
    public class PermissionManager : PermissionContext, IPermissionManager, ISingletonDependency
    {
        public PermissionManager()
        {
            
        }

        public void Initialize()
        {
            var providers = GetProviders();
            foreach (var permissionProvider in providers)
            {
                permissionProvider.Initialize(this);
            }
            PopulatePermissionList();
        }

        //It can be retrieved from configuration
        private List<IPermissionProvider> GetProviders()
        {
            return new List<IPermissionProvider>
            {
                new QuickAppPermissionProvider()
            };
        }
    }
}
