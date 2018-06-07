using System.Collections.Generic;
using QuickApp.Core.Dto.User;
using QuickApp.Web.Core.Models;

namespace QuickApp.Web.Models.User
{
    public class GetUsersOutput : BaseApiOutput
    {
        public List<UserDto> Users { get; set; }

        public GetUsersOutput()
        {
            Users = new List<UserDto>();
        }
    }
}