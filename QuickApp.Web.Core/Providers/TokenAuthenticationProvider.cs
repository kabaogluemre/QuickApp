using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using QuickApp.Core.Authentication;
using QuickApp.Core.DIContainer;
using QuickApp.Core.Services;

namespace QuickApp.Web.Providers
{
    public class TokenAuthenticationProvider : OAuthAuthorizationServerProvider
    {
        private readonly IUserService _userService;
        private readonly IClientService _clientService;
        public TokenAuthenticationProvider()
        {
            _userService = IocHelper.Resolve<IUserService>();
            _clientService = IocHelper.Resolve<IClientService>();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            if (allowedOrigin == null) allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            var user = _userService.GetUserByUsernameAndPassword(context.UserName, context.Password);
            if (user == null)
            {
                context.SetError("invalid_user", "The user name or password is incorrect.");
                return;
            }
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            //Store the userid, provide ISession interface which implemented by singleton session instance. 
            //Provide permissionService to manage claim based authrization.
            identity.AddClaim(new Claim(ClaimType.User.ToString(), user.Id.ToString()));

            var client = _clientService.Get(context.ClientId);

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", context.ClientId
                    },
                    {
                        "userId", user.Id.ToString()
                    }
                })
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(client.TokenTime),
                IssuedUtc = DateTimeOffset.UtcNow,
                IsPersistent = true
            };
            context.Options.AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(client.TokenTime);
            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
            return;
        }
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            //Validate the clients and secrets. Handle API users, Angular users and remember-me. 
            string clientId = string.Empty;
            string clientSecret = string.Empty;

            if (!context.TryGetFormCredentials(out clientId, out clientSecret))
            {
                context.SetError("invalid_client", "Client credentials could not be retrieved.");
                return;
            }
            var client = _clientService.GetByClientIdAndSecret(clientId, clientSecret);
            if(client == null)
            {
                context.SetError("invalid_client", "Client credentials are not valid ! ");
                return;
            }
            context.Validated();
            return;
        }
    }
}