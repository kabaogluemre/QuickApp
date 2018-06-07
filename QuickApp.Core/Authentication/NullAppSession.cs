using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Authentication
{
    public class NullAppSession : IAppSession
    {
        public int? CurrentUserId
        {
            get { return null; }
        }
        public User CurrentUser
        {
            get { return null; }
        }
    }
}
