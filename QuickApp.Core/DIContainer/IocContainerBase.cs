using Castle.Windsor;

namespace QuickApp.Core.DIContainer
{
    public class IocContainerBase
    {
        private static IocContainerBase _instance = new IocContainerBase();

        public static IocContainerBase Instance
        {
            get { return _instance; }
        }

        public WindsorContainer Container
        {
            get
            {
                if (_container == null)
                {
                    _container = new WindsorContainer();
                }
                return _container;
            }
        }

        private WindsorContainer _container;

        private IocContainerBase()
        {

        }
    }
}
