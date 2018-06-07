using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Authentication
{
    public interface IAppSession
    {
        int? CurrentUserId { get; }

        User CurrentUser { get; }
    }
}
