using System.Linq;
using System.Security.Claims;
using System.Threading;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;

namespace QuickApp.Core.Authentication
{
    public class WebAppSession : IAppSession
    {
        private readonly IUserRepository _userRepository;
        private User _currentUser;
        private int? _currentUserId;
        public WebAppSession(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public int? CurrentUserId
        {
            get
            {
                if (_currentUserId == null)
                {
                    var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
                    var userId = identity.Claims?.Where(c => c.Type == ClaimType.User.ToString())
                                     .Select(c => c.Value).SingleOrDefault() ?? "";
                    if (string.IsNullOrEmpty(userId))
                    {
                        return null;
                    }
                    _currentUserId = int.Parse(userId);
                }
                return _currentUserId;
            }
        }
        public User CurrentUser
        {
            get
            {
                return _currentUser ?? (_currentUser = _userRepository.GetIsActive(CurrentUserId ?? -1));
            }
        }
    }
}
