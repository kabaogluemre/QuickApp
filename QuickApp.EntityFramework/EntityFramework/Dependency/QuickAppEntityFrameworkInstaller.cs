using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.DIContainer;
using QuickApp.EntityFramework.EntityFramework.Repositories;
using QuickApp.EntityFramework.EntityFramework.UnitOfWork;

namespace QuickApp.EntityFramework.EntityFramework.Dependency
{
    public class QuickAppEntityFrameworkInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            //Register all singleton dependencies as LifestyleSingleton
            //Classes.FromAssembly(Assembly.GetAssembly(typeof(ISingletonDependency)))
            //    .BasedOn<ISingletonDependency>()
            //    .WithServiceSelf()
            //    .WithService.DefaultInterfaces()
            //    .LifestyleSingleton();
            container.Register(Component.For<UnitOfWorkInterceptor>().LifestyleTransient());
            container.Register(Component.For<IUserRepository>().ImplementedBy<EfUserRepository>().LifestyleTransient());
            container.Register(Component.For<IClientRepository>().ImplementedBy<EfClientRepository>().LifestyleTransient());
            container.Register(Component.For<IRoleRepository>().ImplementedBy<EfRoleRepository>().LifestyleTransient());
            container.Register(Component.For<IRolePermissionRepository>().ImplementedBy<EfRolePermissionRepository>().LifestyleTransient());
        }
    }
}
