using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using QuickApp.Core.Localization;
using System.Threading;
using QuickApp.Web.Core.Controllers;
using QuickApp.Web.Models.Localization;

namespace QuickApp.Web.Controllers
{
    public class ResourceController : BaseApiController
    {
        public List<LocalizationItem> GetResources()
        {
            var resourceSet = AppTexts.ResourceManager.GetResourceSet(Thread.CurrentThread.CurrentCulture, true, true);
            var resources = resourceSet.Cast<DictionaryEntry>()
                                    .Select(x => new LocalizationItem
                                    {
                                        Key = x.Key.ToString(),
                                        Value = x.Value.ToString()
                                    }).ToList();
            return resources;
        }
    }
}