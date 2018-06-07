using System.Globalization;
using System.Threading;

namespace QuickApp.Core.Localization
{
    public class LocalizationHelper
    {
        public static string GetLocalize(string key)
        {
            return AppTexts.ResourceManager.GetString(key,CultureInfo.CurrentCulture);
        }
        public static string GetLocalize(string key,CultureInfo info)
        {
            return AppTexts.ResourceManager.GetString(key, info);
        }
    }
}
