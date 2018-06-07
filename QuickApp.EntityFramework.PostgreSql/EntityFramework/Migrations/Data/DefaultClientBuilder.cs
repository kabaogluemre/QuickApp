using System.Linq;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.Context;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Migrations.Data
{
    public class DefaultClientBuilder
    {
        private readonly QuickAppContext _context;

        public DefaultClientBuilder(QuickAppContext context)
        {
            _context = context;
        }

        public void Build()
        {
            if (_context.Clients.Count() > 0)
            {
                return;
            }
            //Initialize the startup data
            _context.Clients.Add(
                new Core.Data.Entities.Client
                {
                    ClientId = "AngularApp",
                    ClientSecret = "9z5bRzBEyJCE3fAz",
                    TokenTime = 1440
                }
            );
            _context.Clients.Add(
                new Core.Data.Entities.Client
                {
                    ClientId = "ApiUser",
                    ClientSecret = "UBUgDjtsQSveM38W",
                    TokenTime = 20
                }
            );
            _context.Clients.Add(
                new Core.Data.Entities.Client
                {
                    ClientId = "AngularApp-RememberMe",
                    ClientSecret = "yurZ3YE3nGQk5DGW",
                    TokenTime = 525600
                }
            );
        }
    }
}
