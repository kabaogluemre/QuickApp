using System;
using System.Linq;
using QuickApp.Core.Authorization.Providers;
using QuickApp.Core.Data.Entities;
using QuickApp.EntityFramework.EntityFramework.Context;

namespace QuickApp.EntityFramework.EntityFramework.Migrations.Data
{
    public class DefaultRoleBuilder
    {
        private readonly QuickAppContext _context;

        public DefaultRoleBuilder(QuickAppContext context)
        {
            _context = context;
        }

        public void Build()
        {
            if (_context.Roles.Any())
            {
                return;
            }
            //ADMIN ROLE
            var adminRole = new Core.Data.Entities.Role
            {
                Name = "Admin",
                IsSystemRole = true,
                CreationUserId = 1,
                IsActive = true,
                CreationDate = DateTime.Now
            };
            _context.Roles.Add(adminRole);
            _context.SaveChanges();
            //Assign the role to user
            var adminUser = _context.Users.FirstOrDefault(x => x.Username == "admin" && x.IsActive && x.IsSystemUser);
            adminUser?.Roles.Add(adminRole);
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionPages,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionPagesUsers,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionCanCreateUsers,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionCanCreateRoles,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionPagesRoles,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionPagesHome,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            //ADMIN ROLE

            //USER ROLE
            var userRole = new Core.Data.Entities.Role
            {
                Name = "User",
                IsSystemRole = true,
                CreationUserId = 1,
                IsActive = true,
                CreationDate = DateTime.Now
            };
            _context.Roles.Add(userRole);
            _context.SaveChanges();
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = userRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionPages,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            _context.RolePermissions.Add(new RolePermission
            {
                RoleId = userRole.Id,
                PermissionName = QuickAppPermissionNames.PermissionPagesHome,
                IsGranted = true,
                CreationDate = DateTime.Now,
                CreationUserId = 1
            });
            //USER ROLE
        }
    }
}
