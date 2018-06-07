namespace QuickApp.Core.DIContainer
{
    public static class IocHelper
    {
        public static T Resolve<T>()
        {
            return IocContainerBase.Instance.Container.Resolve<T>();
        }
    }
}
