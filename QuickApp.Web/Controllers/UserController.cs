using System;
using System.Threading;
using System.Web.Http;
using QuickApp.Core.Authorization.Providers;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Exceptions;
using QuickApp.Core.Services;
using QuickApp.Web.Core.Authentication;
using QuickApp.Web.Core.Controllers;
using QuickApp.Web.Models.User;

namespace QuickApp.Web.Controllers
{
    [AppAuthorize(QuickAppPermissionNames.PermissionPages)]
    public class UserController : BaseApiController
    {
        private readonly IUserService _userService;

        public UserController()
        {
            _userService = IocContainerBase.Instance.Container.Resolve<IUserService>();
        }
        [HttpPost]
        [AppAuthorize(QuickAppPermissionNames.PermissionCanCreateUsers)]
        public CreateUserOutput CreateUser(CreateUserInput input)
        {
            input.Validate();//It could be better to call the validation method in an interceptor or on action executing.

            _userService.CreateUser(input.User);

            return new CreateUserOutput();
        }
        [HttpPost]
        [AppAuthorize(QuickAppPermissionNames.PermissionCanCreateUsers)]
        public DeleteUserOutput DeleteUser(DeleteUserInput input)
        {
            _userService.DeleteUser(input.UserId);

            return new DeleteUserOutput();
        }
        [HttpPost]
        public GetUserOutput GetUser(GetUserInput input)
        {
            return new GetUserOutput
            {
                User = _userService.GetUser(input.UserId)
            };
        }
        public GetUsersOutput GetUsers(GetUsersInput input)
        {
            //var output = new GetUsersOutput()
            //{
            //    Users = new List<UserDto>
            //    {
            //        new UserDto
            //        {
            //            Id = 1,
            //            FirstName = "Emre",
            //            LastName = "Kabaoğlu",
            //            EmailAddress = "admin@admin.com",
            //            EmployeeNumber = "EmployeeNumber",
            //            Location = "Ankara"
            //        },
            //        new UserDto
            //        {
            //            Id = 1,
            //            FirstName = "Emre",
            //            LastName = "Kabaoğlu",
            //            EmailAddress = "admin@admin.com",
            //            EmployeeNumber = "EmployeeNumber",
            //            Location = "Ankara"
            //        },
            //        new UserDto
            //        {
            //            Id = 1,
            //            FirstName = "Emre",
            //            LastName = "Kabaoğlu",
            //            EmailAddress = "admin@admin.com",
            //            EmployeeNumber = "EmployeeNumber",
            //            Location = "Ankara"
            //        },
            //        new UserDto
            //        {
            //            Id = 1,
            //            FirstName = "Emre",
            //            LastName = "Kabaoğlu",
            //            EmailAddress = "admin@admin.com",
            //            EmployeeNumber = "EmployeeNumber",
            //            Location = "Ankara"
            //        }
            //    }
            //};
            return new GetUsersOutput
            {
                Users = _userService.GetUsers()
            };
        }
    }
}