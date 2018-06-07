using System.Collections.Generic;
using System.Threading;
using AutoMapper;
using QuickApp.Core.Authorization;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.Dto.User;
using QuickApp.Core.Localization;
using QuickApp.Core.Services;
using QuickApp.Web.Core.Controllers;
using QuickApp.Web.Models.Language;
using QuickApp.Web.Models.Session;

namespace QuickApp.Web.Controllers
{
    public class SessionController : BaseApiController
    {
        private readonly IPermissionCheckerManager _permissionCheckerManager;
        public SessionController(IPermissionCheckerManager permissionCheckerManager)
        {
            _permissionCheckerManager = permissionCheckerManager;
        }
        public GetCurrentInfoOutput GetCurrentInfo()
        {
            var result = new GetCurrentInfoOutput
            {
                Languages = new List<LanguageInfoDto>
                {
                    new LanguageInfoDto {LanguageCode = "en-EN", LanguageName = "English",
                        DisplayName = LocalizationHelper.GetLocalize("English")
                    },
                    new LanguageInfoDto
                    {
                        LanguageCode = "tr-TR", LanguageName = "Turkish",
                        DisplayName = LocalizationHelper.GetLocalize("Turkish")
                    }
                }
            };
            if (CurrentUser != null)
            {
                result.CurrentUser = Mapper.Map<UserSessionInfoDto>(CurrentUser);
                result.CurrentUser.GrantedPermissions = _permissionCheckerManager.GetGrantedPermissions();
            }
            return result;
        }
    }
}