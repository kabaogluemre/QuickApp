using System.Globalization;
using System.Threading;
using System.Web;

namespace QuickApp.Web.Core.Localization
{
    public class LocalizationSetterHelper
    {
        public static void SetLocalizationCulture()
        {
            //Set the language code -- Grab it from cookie, session or database for per request
            var languageCode = HttpContext.Current.Request.Cookies[".LanguageCultureName"]?.Value ?? "";
            if (string.IsNullOrEmpty(languageCode))
            {
                languageCode = "en-EN";
            }
            Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo(languageCode);
            Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(languageCode);
        }
    }
}
