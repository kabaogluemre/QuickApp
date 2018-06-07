using QuickApp.EntityFramework.PostgreSql.EntityFramework.Context;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Migrations.Data
{
    public class QuickAppInitialDbBuilder
    {
        private readonly QuickAppContext _context;

        public QuickAppInitialDbBuilder(QuickAppContext context)
        {
            _context = context;
        }

        public void Build()
        {
            new DefaultUserBuilder(_context).Build();
            new DefaultClientBuilder(_context).Build();
            new DefaultRoleBuilder(_context).Build();
        }
    }
}
