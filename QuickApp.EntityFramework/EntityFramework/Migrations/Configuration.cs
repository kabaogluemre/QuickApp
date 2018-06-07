using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuickApp.EntityFramework.EntityFramework.Context;
using QuickApp.EntityFramework.EntityFramework.Migrations.Data;

namespace QuickApp.EntityFramework.EntityFramework.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<QuickAppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "QuickApp_";
            CommandTimeout = 60 * 60; //1 hour (in seconds)
        }

        protected override void Seed(QuickAppContext context)
        {
            new QuickAppInitialDbBuilder(context).Build();
        }
    }
}
