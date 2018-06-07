using System.Collections.Generic;
using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Data.Repositories
{
    public interface IUserRepository : IRepository<User,int>
    {
        List<User> GetUsers();

        void DeleteUser(int userId);
    }
}
