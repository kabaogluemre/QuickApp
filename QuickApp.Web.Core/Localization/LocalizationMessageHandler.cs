using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace QuickApp.Web.Core.Localization
{
    public class LocalizationMessageHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            LocalizationSetterHelper.SetLocalizationCulture();
            var response = await base.SendAsync(request, cancellationToken);
            return response;
        }
    }
}
