using System;
using System.Reflection;
using QuickApp.Core.Attributes;
using QuickApp.Core.Data.Repositories;

namespace QuickApp.Core.Utils
{
    public class UnitOfWorkHelper
    {
        public static bool IsRepositoryClass(Type type)
        {
            return typeof(IBaseRepository).IsAssignableFrom(type);
        }

        public static bool HasUnitOfWorkAttribute(MethodInfo methodInfo)
        {
            return methodInfo.IsDefined(typeof(UnitOfWork), true);
        }
    }
}
