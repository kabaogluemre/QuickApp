using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using QuickApp.Core.Attributes;
using QuickApp.Core.Authorization;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.Dto.Role;
using QuickApp.Core.Exceptions;

namespace QuickApp.Core.Services.Impl
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IRoleManager _roleManager;
        public RoleService(
            IRoleRepository roleRepository, 
            IRoleManager roleManager)
        {
            _roleRepository = roleRepository;
            _roleManager = roleManager;
        }
        [UnitOfWork]
        public List<RoleDto> GetRoles()
        {
            return Mapper.Map<List<RoleDto>>(_roleRepository.GetAllList(x => x.IsActive).OrderBy(x => x.Id));
        }
        public RoleDto GetRole(int roleId)
        {
            var role = Mapper.Map<RoleDto>(_roleRepository.GetIsActive(roleId));
            role.GrantedPermissions = _roleManager.GetGrantedPermissions(role.Id, true);
            return role;
        }
        [UnitOfWork]
        public int CreateRole(RoleDto role)
        {
            var roleEntity = Mapper.Map<Role>(role);
            if (role.Id > 0)//Edit role
            {
                var existRole = _roleRepository.GetIsActive(role.Id);
                if (existRole == null)
                {
                    throw new UserFriendlyException("The role that desired to be edited doesn't exist !");
                }
                existRole.Name = role.Name;
                _roleRepository.Update(existRole);
                return existRole.Id;
            }
            var newRole = new Role
            {
                Name = roleEntity.Name,
                IsActive = true,
            };
            _roleRepository.Insert(newRole,true);
            return newRole.Id;
        }
        [UnitOfWork]
        public void CreateRole(RoleDto role,List<string> grantedPermissions)
        {
            var roleId = CreateRole(role);
             _roleManager.SetGrantedPermissions(roleId,grantedPermissions);
        }
        public void DeleteRole(int roleId)
        {
            _roleRepository.DeleteRole(roleId);
        }
    }
}
