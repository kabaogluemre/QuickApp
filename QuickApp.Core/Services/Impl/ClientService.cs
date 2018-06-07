using System.Collections.Generic;
using QuickApp.Core.Attributes;
using QuickApp.Core.Data.Entities;
using QuickApp.Core.Data.Repositories;
using QuickApp.Core.DIContainer;
using System.Linq;

namespace QuickApp.Core.Services
{
    public class ClientService : IClientService, ISingletonDependency
    {
        private List<Client> _clients;

        public ClientService(IClientRepository clientRepository)
        {
            _clients = clientRepository.GetAllList();
        }
        public List<Client> GetClients()
        {
            return _clients;
        }
        public Client Get(string clientId)
        {
            return _clients.SingleOrDefault(x => x.ClientId == clientId);
        }
        public Client GetByClientIdAndSecret(string clientId, string secret)
        {
            return _clients.SingleOrDefault(x => x.ClientId == clientId && x.ClientSecret == secret);
        }
    }
}
