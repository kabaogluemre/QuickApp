using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using QuickApp.Core.Data.Entities;

namespace QuickApp.EntityFramework.EntityFramework.Context
{
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
            Database.Connection.ConnectionString = ConfigurationManager.ConnectionStrings["MainDatabase"].ConnectionString;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<QuickAppContext>(null);
            modelBuilder.Entity<User>()
                .HasMany(s => s.Roles)
                .WithMany(c => c.Users)
                .Map(cs =>
                {
                    cs.MapLeftKey("UserId");
                    cs.MapRightKey("RoleId");
                    cs.ToTable("UserRoles");
                });
        }
    }
}
