using System.Linq;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.Exceptions;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Repositories
{
    public class EfRoleRepository : BaseRepository<Role, int>, IRoleRepository
    {
        public void DeleteRole(int roleId)
        {
            var existRole = Table.SingleOrDefault(x => x.Id == roleId && x.IsActive);
            if (existRole == null)
            {
                throw new UserFriendlyException("The user that desired to be removed doesn't exist !");
            }
            if (existRole.IsSystemRole)
            {
                throw new UserFriendlyException("This role can't be deleted.");
            }
            existRole.IsActive = false;
        }
    }
}
