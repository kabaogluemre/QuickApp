using System.Collections.Generic;
using System.Web.Http;
using QuickApp.Core.Authorization;
using QuickApp.Core.Authorization.Providers;
using QuickApp.Core.Dto.Role;
using QuickApp.Core.Services;
using QuickApp.Web.Core.Authentication;
using QuickApp.Web.Core.Controllers;
using QuickApp.Web.Models.Roles;

namespace QuickApp.Web.Controllers
{
    [AppAuthorize(QuickAppPermissionNames.PermissionPagesRoles)]
    public class RoleController : BaseApiController
    {
        private readonly IRoleService _roleService;
        private readonly IPermissionManager _permissionManager;

        public RoleController(
            IRoleService roleService,
            IPermissionManager permissionManager)
        {
            _roleService = roleService;
            _permissionManager = permissionManager;
        }

        public GetRolesOutput GetRoles()
        {
            return new GetRolesOutput
            {
                Roles = _roleService.GetRoles()
            };
        }
        [HttpPost]
        public GetRoleOutput GetRole(GetRoleInput input)
        {
            return new GetRoleOutput
            {
                Role = _roleService.GetRole(input.RoleId)
            };
        }
        public GetPermissionsOutput GetPermissions(GetPermissionsInput input)
        {
            return new GetPermissionsOutput
            {
                Permissions = _permissionManager.GetAllPermissions()
            };
        }
        [HttpPost]
        [AppAuthorize(QuickAppPermissionNames.PermissionCanCreateRoles)]
        public CreateRoleOutput CreateRole(CreateRoleInput input)
        {
            _roleService.CreateRole(input.Role,input.GrantedPermissions);

            return new CreateRoleOutput();
        }
        [HttpPost]
        [AppAuthorize(QuickAppPermissionNames.PermissionCanCreateRoles)]
        public DeleteRoleOutput DeleteRole(DeleteRoleInput input)
        {
            _roleService.DeleteRole(input.RoleId);

            return new DeleteRoleOutput();
        }
    }
}