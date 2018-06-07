using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using QuickApp.Core.Data.Entities;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Context
{
    [DbConfigurationType(typeof(NpgsqlConfiguration))]
    public class QuickAppContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<RolePermission> RolePermissions { get; set; }

        public virtual DbSet<Client> Clients { get; set; }

        public QuickAppContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {
            ((IObjectContextAdapter)this).ObjectContext.CommandTimeout = 180;
        }
        public QuickAppContext() : base()
        {
            //Don't set connection string here, the migrations are dropping error.
            //if (System.Diagnostics.Debugger.IsAttached == false)
            //{
            //    System.Diagnostics.Debugger.Launch();
            //}
            //Database.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["MainDatabase"].ConnectionString;
        }
        protected override void OnModelCreating(DbModelBuilder builder)
        {
            builder.HasDefaultSchema("public");//Postgre sql default schema
            Database.SetInitializer<QuickAppContext>(null);
            builder.Entity<User>()
                .HasMany(s => s.Roles)
                .WithMany(c => c.Users)
                .Map(cs =>
                {
                    cs.MapLeftKey("UserId");
                    cs.MapRightKey("RoleId");
                    cs.ToTable("UserRoles");
                });
            base.OnModelCreating(builder);
        }
    }
    public class NpgsqlConfiguration : DbConfiguration
    {
        public NpgsqlConfiguration()
        {
            SetProviderServices("Npgsql", Npgsql.NpgsqlServices.Instance);
            SetProviderFactory("Npgsql", Npgsql.NpgsqlFactory.Instance);
            SetDefaultConnectionFactory(new Npgsql.NpgsqlConnectionFactory());
        }
    }
}
