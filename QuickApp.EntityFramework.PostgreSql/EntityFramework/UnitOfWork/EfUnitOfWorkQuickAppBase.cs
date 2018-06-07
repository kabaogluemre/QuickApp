using System;
using System.Configuration;
using System.Transactions;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.Context;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.UnitOfWork
{
    public class EfUnitOfWorkQuickAppBase : IDisposable
    {
        private TransactionScope _transaction;

        [ThreadStatic]
        private static EfUnitOfWorkQuickAppBase _instance;

        public bool UseTransaction { get; set; }

        //private static ThreadLocal<EfUnitOfWorkQuickAppBase> instances = new ThreadLocal<EfUnitOfWorkQuickAppBase>(() => new EfUnitOfWorkQuickAppBase());

        public static EfUnitOfWorkQuickAppBase Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new EfUnitOfWorkQuickAppBase();
                }
                return _instance;
            }
        }

        public QuickAppContext Context { get; private set; }

        private EfUnitOfWorkQuickAppBase()
        {

        }

        public void BeginTransaction()
        {
            ResolveContext();

            if (UseTransaction)
            {
                try
                {
                    var transactionOptions = new TransactionOptions { IsolationLevel = IsolationLevel.ReadUncommitted };
                    _transaction = new TransactionScope(TransactionScopeOption.RequiresNew, transactionOptions);
                }
                catch
                {
                    Dispose();
                    throw;
                }
            }
        }

        public void CommitTransaction()
        {
            Context.SaveChanges();
            if (UseTransaction)
            {
                _transaction.Complete();
            }
        }

        public void RollbackTransaction()
        {
            Dispose();
        }

        private void ResolveContext()
        {
            Context = new QuickAppContext(ConfigurationManager.ConnectionStrings["MainDatabase"].ConnectionString);
        }

        public void Dispose()
        {
            if (UseTransaction)
            {
                _transaction.Dispose();
            }
            Context.Dispose();
            Context = null;
            _transaction = null;
        }
    }
}
