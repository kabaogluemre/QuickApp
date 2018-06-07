using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Linq.Dynamic;
using QuickApp.Core.Authentication;
using QuickApp.EntityFramework.EntityFramework.UnitOfWork;
using QuickApp.EntityFramework.EntityFramework.Context;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.Data.Entities.BaseActions;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.DIContainer;

namespace QuickApp.EntityFramework.EntityFramework.Repositories
{
    public abstract class BaseRepository<TEntity, TPrimary> : IRepository<TEntity, TPrimary>
        where TEntity : BaseEntity<TPrimary>, new()
    {
        public QuickAppContext Context
        {
            get { return EfUnitOfWorkQuickAppBase.Instance.Context; }
        }
        protected DbSet<TEntity> Table
        {
            get { return Context.Set<TEntity>(); }
        }
        public virtual IQueryable<TEntity> GetAll()
        {
            return Table;
        }
        public virtual int Count()
        {
            return GetAll().Count();
        }
        public virtual void Attach(TEntity entity)
        {
            Table.Attach(entity);
        }

        public virtual int Count(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().Count(predicate);
        }
        public virtual long LongCount()
        {
            return GetAll().LongCount();
        }

        public virtual long LongCount(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().LongCount(predicate);
        }
        public virtual List<TEntity> GetAllList(Expression<Func<TEntity, bool>> predicate)
        {
            return Table.Where(predicate).ToList();
        }
        public virtual List<TEntity> GetAllList()
        {
            return Table.ToList();
        }
        public virtual TEntity Get(TPrimary key)
        {
            return GetAll().AsNoTracking().Where("Id = @0", key).FirstOrDefault();
        }
        public virtual TEntity GetIsActive(TPrimary key)
        {
            return GetAll().AsNoTracking().Where("Id = @0 and IsActive = true", key).FirstOrDefault();
        }
        public virtual TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().FirstOrDefault(predicate);
        }

        public virtual TEntity GetOrDefault(TPrimary key)
        {
            return GetAll().Where("Id = @0", key).FirstOrDefault();
        }

        public virtual TEntity Single(Expression<Func<TEntity, bool>> predicate)
        {
            return GetAll().Single(predicate);
        }
        public virtual TPrimary Insert(TEntity entity,bool saveChanges = false)
        {
            Table.Add(entity);
            if (entity is IWriteHistoryLogs)
            {
                WriteHistoryLogs(entity, "INSERT");
            }
            if (entity is IEntityCreation)
            {
                SetEntityCreation((IEntityCreation)entity);
            }
            if (saveChanges)
            {
                Context.SaveChanges();
            }
            return entity.Id;
        }

        public void Update(TEntity entity)
        {
            if (entity is IBeforeUpdate)
            {
                (entity as IBeforeUpdate).Action();
            }
            if (entity is IWriteHistoryLogs)
            {
                WriteHistoryLogs(entity, "UPDATE");
            }
            Table.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
        }
        public virtual void Delete(TEntity entity)
        {
            if (entity is IWriteHistoryLogs)
            {
                WriteHistoryLogs(entity, "DELETE");
            }
            Table.Remove(entity);
        }
        public virtual void Delete(TPrimary key)
        {
            var entity = Table.Local.FirstOrDefault(ent => EqualityComparer<TPrimary>.Default.Equals(ent.Id, key));
            if (entity == null)
            {
                entity = new TEntity { Id = key };
                Table.Attach(entity);
            }
            if (entity is IWriteHistoryLogs)
            {
                WriteHistoryLogs(entity, "DELETE");
            }

            Table.Remove(entity);
        }

        protected void WriteHistoryLogs(TEntity entity, string action)
        {
            //Write the history log to EntityHistoriesTable
        }
        protected void SetEntityCreation(IEntityCreation entity)
        {
            //The IAppSession should be registered for web and service app on the startup
            var appSession = IocHelper.Resolve<IAppSession>();
            entity.CreationDate = DateTime.Now;
            entity.CreationUserId = appSession.CurrentUserId;
        }
    }
}
