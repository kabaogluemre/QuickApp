using System;
using QuickApp.Core.Dto.User;
using QuickApp.Web.Controls;

namespace QuickApp.Web.Models.User
{
    public class CreateUserInput : IInputValidatable
    {
        public UserDto User { get;set;}

        public void Validate()
        {
            if (User == null)
            {
                throw new Exception("User object is required ! ");
            }
        }
    }
}