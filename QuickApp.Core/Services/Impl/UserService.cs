using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using QuickApp.Core.Attributes;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.Dto.Role;
using QuickApp.Core.Dto.User;
using QuickApp.Core.Utils;

namespace QuickApp.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public UserService(
            IUserRepository userRepository,
            IRoleRepository roleRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }
        [UnitOfWork]
        public List<UserDto> GetUsers()
        {
            var userDtoList = new List<UserDto>();
            var users = _userRepository.GetUsers().OrderBy(x => x.Id).ToList();
            foreach (var user in users)
            {
                var userDto = Mapper.Map<UserDto>(user);
                userDto.Roles = Mapper.Map<List<RoleDto>>(user.Roles.Where(x => x.IsActive));
                userDtoList.Add(userDto);
            }
            return userDtoList;
        }
        [UnitOfWork]
        public UserDto GetUser(int userId)
        {
            var user = _userRepository.GetIsActive(userId);
            var userDto = Mapper.Map<UserDto>(user);
            userDto.Roles = Mapper.Map<List<RoleDto>>(user.Roles.Where(x => x.IsActive));
            return userDto;
        }
        [UnitOfWork]
        public void CreateUser(UserDto user)
        {
            if (user.Id > 0)//Edit user
            {
                var existUser = _userRepository.GetAll()
                    .Include(x => x.Roles).FirstOrDefault(x => x.IsActive && x.Id == user.Id);
                if (existUser == null)
                {
                    throw new Exception("The user that desired to be edited doesn't exist !");
                }
                if(existUser.Password != user.Password)
                {
                    existUser.Password = CryptographyHelper.Encrypt(user.Password);
                }
                existUser.Username = user.Username;
                existUser.FirstName = user.FirstName;
                existUser.LastName = user.LastName;
                existUser.EmailAddress = user.EmailAddress;
                existUser.EmployeeNumber = user.EmployeeNumber;
                existUser.Location = user.Location;
                existUser.Roles.Clear();
                foreach (var userRole in user.Roles)
                {
                    var role = _roleRepository.FirstOrDefault(x => x.Id == userRole.Id);
                    existUser.Roles.Add(role);
                }
                _userRepository.Update(existUser);
            }
            else
            {
                var newUser = new User
                {
                    Username = user.Username,
                    Password = CryptographyHelper.Encrypt(user.Password),
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    EmailAddress = user.EmailAddress,
                    EmployeeNumber = user.EmployeeNumber,
                    Location = user.Location,
                    Roles = new List<Role>()
                };

                foreach (var userRole in user.Roles)
                {
                    var role = new Role
                    {
                        Id = userRole.Id
                    };
                    _roleRepository.Attach(role);
                    newUser.Roles.Add(role);
                }
                _userRepository.Insert(newUser);
            }
        }
        public void DeleteUser(int userId)
        {
            _userRepository.DeleteUser(userId);
        }
        [UnitOfWork]
        public User GetUserByUsernameAndPassword(string username,string plainPassword)
        {
            var password = CryptographyHelper.Encrypt(plainPassword);
            return _userRepository.GetAll().FirstOrDefault(x => x.Username == username && x.Password == password && x.IsActive);
        }
    }
}
