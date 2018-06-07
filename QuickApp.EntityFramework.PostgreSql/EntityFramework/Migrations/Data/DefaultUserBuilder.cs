using QuickApp.EntityFramework.PostgreSql.EntityFramework.Context;
using System.Linq;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Migrations.Data
{
    public class DefaultUserBuilder
    {
        private readonly QuickAppContext _context;

        public DefaultUserBuilder(QuickAppContext context)
        {
            _context = context;
        }

        public void Build()
        {
            if (_context.Users.Count() > 0)
            {
                return;
            }
            //Initialize the startup data
            _context.Users.Add(
                new Core.Data.Entities.User
                {
                    Username = "admin",
                    Password = "1f2f4704d476cca04f10e31a6da98cb7",//123qwe
                    FirstName = "System",
                    LastName = "Administrator",
                    EmailAddress = "admin@admin.com",
                    EmployeeNumber = "123",
                    IsSystemUser = true,
                    IsActive = true,
                    Location = "Turkey"
                }
            );
        }
    }
}
