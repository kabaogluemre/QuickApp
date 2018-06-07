using System.Web.Http;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace QuickApp.Web.Dependency
{
    public class CastleWindsorApiInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                //All MVC controllers
                Classes.FromThisAssembly().BasedOn<IController>().LifestyleTransient(),
                //All ApiControllers
                Classes.FromThisAssembly().BasedOn<ApiController>().LifestyleTransient()
            );
        }
    }
}
