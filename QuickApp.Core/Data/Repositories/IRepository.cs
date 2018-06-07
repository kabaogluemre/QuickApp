using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Data.Repositories
{
    public interface IRepository<TEntity, TPrimaryKey>: IBaseRepository where TEntity : BaseEntity<TPrimaryKey>
    {
        void Attach(TEntity entity);
        int Count();
        int Count(Expression<Func<TEntity, bool>> predicate);
        void Delete(TPrimaryKey key);
        void Delete(TEntity entity);
        TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> GetAll();
        List<TEntity> GetAllList();
        List<TEntity> GetAllList(Expression<Func<TEntity, bool>> predicate);
        TEntity Get(TPrimaryKey key);
        TEntity GetIsActive(TPrimaryKey key);
        TEntity GetOrDefault(TPrimaryKey key);
        TPrimaryKey Insert(TEntity entity,bool saveChanges = false);
        long LongCount();
        long LongCount(Expression<Func<TEntity, bool>> predicate);
        TEntity Single(Expression<Func<TEntity, bool>> predicate);
        void Update(TEntity entity);
    }
}
