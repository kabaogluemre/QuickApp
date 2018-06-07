namespace QuickApp.EntityFramework.PostgreSql.EntityFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Startup : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "public.Clients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClientId = c.String(nullable: false),
                        ClientSecret = c.String(nullable: false),
                        TokenTime = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "public.RolePermissions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleId = c.Int(nullable: false),
                        PermissionName = c.String(nullable: false),
                        IsGranted = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        CreationUserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("public.Roles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.RoleId);
            
            CreateTable(
                "public.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        IsActive = c.Boolean(nullable: false),
                        IsSystemRole = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        CreationUserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "public.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false, maxLength: 50),
                        Password = c.String(nullable: false),
                        FirstName = c.String(nullable: false, maxLength: 50),
                        LastName = c.String(nullable: false, maxLength: 50),
                        EmailAddress = c.String(nullable: false, maxLength: 250),
                        EmployeeNumber = c.String(maxLength: 100),
                        Location = c.String(maxLength: 100),
                        IsActive = c.Boolean(nullable: false),
                        IsSystemUser = c.Boolean(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        CreationUserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "public.UserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("public.Users", t => t.UserId, cascadeDelete: true)
                .ForeignKey("public.Roles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("public.RolePermissions", "RoleId", "public.Roles");
            DropForeignKey("public.UserRoles", "RoleId", "public.Roles");
            DropForeignKey("public.UserRoles", "UserId", "public.Users");
            DropIndex("public.UserRoles", new[] { "RoleId" });
            DropIndex("public.UserRoles", new[] { "UserId" });
            DropIndex("public.RolePermissions", new[] { "RoleId" });
            DropTable("public.UserRoles");
            DropTable("public.Users");
            DropTable("public.Roles");
            DropTable("public.RolePermissions");
            DropTable("public.Clients");
        }
    }
}
