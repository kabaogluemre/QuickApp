using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Data.Repositories
{
    public interface IRoleRepository : IRepository<Role, int>
    {
        void DeleteRole(int roleId);
    }
}
