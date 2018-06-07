using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.Exceptions;

namespace QuickApp.EntityFramework.EntityFramework.Repositories
{
    public class EfUserRepository : BaseRepository<User, int>, IUserRepository
    {
        public List<User> GetUsers()
        {
            return Table.Include(x => x.Roles)
                .Where(x => x.IsActive).ToList();
        }
        public void DeleteUser(int userId)
        {
            var existUser = Table.SingleOrDefault(x => x.Id == userId && x.IsActive);
            if (existUser == null)
            {
                throw new Exception("The user that desired to be removed doesn't exist !");
            }
            if (existUser.IsSystemUser)
            {
                throw new UserFriendlyException("This user can't be deleted. ");
            }
            existUser.IsActive = false;
        }
    }
}
