using System.Collections.Generic;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Dto.User;

namespace QuickApp.Core.Services
{
    public interface IUserService
    {
        List<UserDto> GetUsers();

        UserDto GetUser(int userId);

        void CreateUser(UserDto user);

        void DeleteUser(int userId);

        User GetUserByUsernameAndPassword(string username, string plainPassword);
    }
}
