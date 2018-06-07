namespace QuickApp.Core.Authorization.Providers
{
    public interface IPermissionProvider
    {
        void Initialize(IPermissionContext context);
    }
}
