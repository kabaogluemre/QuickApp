using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using QuickApp.Core.Authorization;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Dto.Mapper;
using QuickApp.Web.Dependency;

namespace QuickApp.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            log4net.Config.XmlConfigurator.Configure();

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            DtoMapper.Map();
            InitializeIocContainer.Initialize();
            var permissionManager = IocHelper.Resolve<IPermissionManager>();
            permissionManager.Initialize();
        }
    }
}
