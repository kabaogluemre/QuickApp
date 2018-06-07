using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Http.ExceptionHandling;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using QuickApp.Core.DIContainer;
using QuickApp.Web.Core.Dependency;
using QuickApp.Web.Core.ExceptionHandlers;
using QuickApp.Web.Core.Localization;
using QuickApp.Web.Dependency;

namespace QuickApp.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.MessageHandlers.Add(new LocalizationMessageHandler());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { id = RouteParameter.Optional }
            );
            //Only json formatted responses
            GlobalConfiguration.Configuration.Formatters.Clear();
            var formatter = new JsonMediaTypeFormatter();
            formatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            formatter.SerializerSettings.Culture = CultureInfo.CurrentCulture;
            GlobalConfiguration.Configuration.Formatters.Add(formatter);

            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new WindsorCompositionRoot(IocContainerBase.Instance.Container));
            config.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());
        }
    }
}
