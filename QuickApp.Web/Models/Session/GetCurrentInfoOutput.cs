using System.Collections.Generic;
using QuickApp.Core.Dto.User;
using QuickApp.Web.Models.Language;

namespace QuickApp.Web.Models.Session
{
    public class GetCurrentInfoOutput
    {
        public UserSessionInfoDto CurrentUser { get; set; }

        public List<LanguageInfoDto> Languages { get; set; }
    }
}