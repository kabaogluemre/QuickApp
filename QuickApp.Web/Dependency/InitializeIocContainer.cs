using log4net;
using System.Configuration;
using System.Reflection;
using System.Web.Mvc;
using QuickApp.Core.DIContainer;
using QuickApp.EntityFramework.EntityFramework.Dependency;
using QuickApp.EntityFramework.EntityFramework.UnitOfWork;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.Dependency;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.UnitOfWork;
using QuickApp.Web.Core.Dependency;

namespace QuickApp.Web.Dependency
{
    public class InitializeIocContainer
    {
        protected static readonly ILog _logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType.Name);

        public static void Initialize()
        {
            _logger.Info("IocContainer created ! ");

            int databaseChoice;
            int.TryParse(ConfigurationManager.AppSettings["DatabaseChoice"] ?? "1",out databaseChoice);

            IocContainerBase.Instance.Container.Install(new CastleWindsorApiInstaller());
            ControllerBuilder.Current.SetControllerFactory(new WindsorControllerFactory(IocContainerBase.Instance.Container.Kernel));

            if (databaseChoice == 1)//Switch database
            {
                //Register unit of work interceptor
                IocContainerBase.Instance.Container.Kernel.ComponentRegistered += UnitOfWorkRegisterEvent.RegisterUnitOfWorkInterceptor;
                IocContainerBase.Instance.Container.Install(new QuickAppEntityFrameworkInstaller());
            }
            else
            {
                //Register unit of work interceptor
                IocContainerBase.Instance.Container.Kernel.ComponentRegistered += UnitOfWorkRegisterPostgreSqlEvent.RegisterUnitOfWorkInterceptor;
                IocContainerBase.Instance.Container.Install(new QuickAppEfPostgreSqlInstaller());
            }

            IocContainerBase.Instance.Container.Install(new QuickAppCoreInstaller());

            IocContainerBase.Instance.Container.Install(new WebCoreInstaller());
        }
    }
}