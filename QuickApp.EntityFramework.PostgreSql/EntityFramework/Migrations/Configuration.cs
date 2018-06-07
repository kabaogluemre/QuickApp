using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Npgsql;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.Context;
using QuickApp.EntityFramework.PostgreSql.EntityFramework.Migrations.Data;

namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<QuickAppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "QuickApp";
            CommandTimeout = 60 * 60; //1 hour (in seconds)            
        }

        protected override void Seed(QuickAppContext context)
        {
            new QuickAppInitialDbBuilder(context).Build();
        }
    }
}
