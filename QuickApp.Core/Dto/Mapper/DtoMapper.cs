using System.Linq;
using QuickApp.Core.Authorization;
using QuickApp.Core.Dto.Role;
using QuickApp.Core.Dto.User;

namespace QuickApp.Core.Dto.Mapper
{
    public static class DtoMapper
    {
        private static bool _mappedBefore;
        public static void Map()
        {
            if (_mappedBefore)
            {
                return;
            }
            _mappedBefore = true;
            AutoMapper.Mapper.CreateMap<Data.Entities.User, UserDto>()
                .ForMember(dest => dest.Roles,opt => opt.Ignore()).ReverseMap()
                .ForMember(dest => dest.Roles,opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<Data.Entities.User, UserSessionInfoDto>().ReverseMap();
            AutoMapper.Mapper.CreateMap<Data.Entities.Role, RoleDto>().ReverseMap()
                .ForMember(dest => dest.Users, opt => opt.Ignore());
            AutoMapper.Mapper.CreateMap<Permission, PermissionDto>()
                .ForMember(dest => dest.ParentName, source => source.MapFrom(x => x.Parent != null ? x.Parent.Name : string.Empty))
                .ForMember(dest => dest.ChildrenCount,opt => opt.MapFrom(x => x.Children != null ? x.Children.Count : 0))
                .ForMember(dest => dest.DisplayName, opt => opt.Ignore())
                .ForMember(dest => dest.Description, opt => opt.Ignore());
        }
    }
}
