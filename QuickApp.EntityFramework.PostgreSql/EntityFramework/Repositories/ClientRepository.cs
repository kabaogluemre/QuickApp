using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Repositories
{
    public class EfClientRepository : BaseRepository<Client, int>, IClientRepository
    {

    }
}
