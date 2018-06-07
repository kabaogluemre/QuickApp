using System.Collections.Generic;
using QuickApp.Core.Data.Entities;

namespace QuickApp.Core.Services
{
    public interface IClientService
    {
        List<Client> GetClients();

        Client Get(string clientId);

        Client GetByClientIdAndSecret(string clientId, string secret);
    }
}
