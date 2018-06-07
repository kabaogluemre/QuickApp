using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using System.Reflection;
using QuickApp.Core.Services;
using QuickApp.Core.Services.Impl;

namespace QuickApp.Core.DIContainer
{
    public class QuickAppCoreInstaller : IWindsorInstaller
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
                 Component.For<IUserService>().ImplementedBy<UserService>().LifestyleTransient(),
                 Component.For<IRoleService>().ImplementedBy<RoleService>().LifestyleTransient()
            );
        }
    }
}
