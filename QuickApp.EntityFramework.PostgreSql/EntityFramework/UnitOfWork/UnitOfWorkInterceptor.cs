using Castle.DynamicProxy;
using log4net;
using System;
using System.Reflection;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.UnitOfWork;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.UnitOfWork
{
    public class UnitOfWorkInterceptor : IInterceptor
    {
        protected static readonly ILog _logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType.Name);

        public void Intercept(IInvocation invocation)
        {
            if (invocation.MethodInvocationTarget.DeclaringType != null)
            {
                _logger.Debug(invocation.MethodInvocationTarget.DeclaringType.Name + " -> " + invocation.MethodInvocationTarget.Name);
            }
            //If there is a running transaction, just run the method
            if (EfUnitOfWorkQuickAppBase.Instance.Context != null)
            {
                invocation.Proceed();
                return;
            }
            //The context should be created for per thread/request.
            //_logger.Debug("EfUnitOfWorkSampleContextBase.Instance Hash : " + EfUnitOfWorkQuickAppBase.Instance.GetHashCode());
            var useTransaction = true;
            var uowAttributes = invocation.MethodInvocationTarget.GetCustomAttributes(typeof(Core.Attributes.UnitOfWork), true);
            if (uowAttributes.Length > 0)//Disable the transaction by using DisableTransaction property of the attribute
                if (((Core.Attributes.UnitOfWork)uowAttributes[0]).DisableTransaction)
                    useTransaction = false;
            try
            {
                EfUnitOfWorkQuickAppBase.Instance.UseTransaction = useTransaction;
                EfUnitOfWorkQuickAppBase.Instance.BeginTransaction();
                try
                {
                    invocation.Proceed();
                    EfUnitOfWorkQuickAppBase.Instance.CommitTransaction();
                }
                catch (Exception e)
                {
                    _logger.Error(e.Message, e);
                    throw;
                }
            }
            finally
            {
                EfUnitOfWorkQuickAppBase.Instance.Dispose();
            }
        }
    }
}
