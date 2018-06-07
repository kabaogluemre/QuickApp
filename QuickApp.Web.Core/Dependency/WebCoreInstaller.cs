using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using QuickApp.Core.Authentication;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Services;

namespace QuickApp.Web.Core.Dependency
{
    public class WebCoreInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            //Register all singleton dependencies as LifestyleSingleton
            container.Register(
                Classes.FromAssembly(Assembly.GetAssembly(typeof(ISingletonDependency)))
                    .BasedOn<ISingletonDependency>()
                    .WithServiceSelf()
                    .WithService.DefaultInterfaces()
                    .LifestyleSingleton(),
                Classes.FromAssembly(Assembly.GetAssembly(typeof(ITransientDependency)))
                    .BasedOn<ITransientDependency>()
                    .WithServiceSelf()
                    .WithService.DefaultInterfaces()
                    .LifestyleTransient(),
                Component.For<IAppSession>().ImplementedBy<WebAppSession>().LifestylePerWebRequest()
            );
        }
    }
}
