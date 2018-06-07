using System.Collections.Generic;
using QuickApp.Core.Authorization;
using QuickApp.Web.Core.Models;

namespace QuickApp.Web.Models.Roles
{
    public class GetPermissionsOutput : BaseApiOutput
    {
        public List<PermissionDto> Permissions { get; set; }
    }
}