using Castle.Core;
using Castle.MicroKernel;
using System.Reflection;
using QuickApp.Core.Utils;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.UnitOfWork
{
    public class UnitOfWorkRegisterPostgreSqlEvent
    {
        public static void RegisterUnitOfWorkInterceptor(string key, IHandler handler)
        {
            foreach (var method in handler.ComponentModel.Implementation.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic))
            {
                if (UnitOfWorkHelper.HasUnitOfWorkAttribute(method))
                {
                    handler.ComponentModel.Interceptors.Add(new InterceptorReference(typeof(UnitOfWorkInterceptor)));
                    return;
                }
            }
            if (UnitOfWorkHelper.IsRepositoryClass(handler.ComponentModel.Implementation))
            {
                handler.ComponentModel.Interceptors.Add(new InterceptorReference(typeof(UnitOfWorkInterceptor)));
                return;
            }
        }
    }
}
