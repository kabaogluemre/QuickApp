using System;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Results;
using log4net;
using QuickApp.Core.Authentication;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Exceptions;
using QuickApp.Core.Localization;
using QuickApp.Web.Core.Localization;

namespace QuickApp.Web.Core.Controllers
{
    public class BaseApiController : ApiController
    {
        protected static readonly ILog _logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType.Name);

        private readonly IAppSession _appSession;

        public BaseApiController()
        {
            _appSession = IocHelper.Resolve<IAppSession>();
        }

        protected User CurrentUser
        {
            get { return _appSession.CurrentUser; }
        }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            
            LocalizationSetterHelper.SetLocalizationCulture();
            base.Initialize(controllerContext);
        }
    }
}
