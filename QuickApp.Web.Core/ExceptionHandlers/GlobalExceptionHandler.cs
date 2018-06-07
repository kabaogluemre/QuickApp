using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using log4net;
using QuickApp.Core.Exceptions;
using QuickApp.Core.Localization;
using QuickApp.Web.Core.Contents;
using QuickApp.Web.Core.Models;

namespace QuickApp.Web.Core.ExceptionHandlers
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        protected static readonly ILog _logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType.Name);

        public override void Handle(ExceptionHandlerContext context)
        {
            _logger.Error(context.Exception.Message, context.Exception);
            var errorMessage = "";
            if (context.Exception is UserFriendlyException)
            {
                errorMessage = context.Exception.Message;
            }
            else if (context.Exception is UnAuthorizationException)
            {
                errorMessage = LocalizationHelper.GetLocalize("UnAuthorizedRequest");
            }
            else
            {
                errorMessage = LocalizationHelper.GetLocalize("UnexpectedError");
            }
            var result = new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new JsonContent(
                    new BaseApiOutput
                    {
                        ErrorMessage = errorMessage,
                        Error = "UserFriendlyException"
                    }),
                ReasonPhrase = "UserFriendlyException"
            };
            context.Result = new UserFriendlyExceptionResult(context.Request, result);
        }
        public class UserFriendlyExceptionResult : IHttpActionResult
        {
            private HttpRequestMessage _request;
            private HttpResponseMessage _httpResponseMessage;


            public UserFriendlyExceptionResult(HttpRequestMessage request, HttpResponseMessage httpResponseMessage)
            {
                _request = request;
                _httpResponseMessage = httpResponseMessage;
            }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                return Task.FromResult(_httpResponseMessage);
            }
        }
    }
}
