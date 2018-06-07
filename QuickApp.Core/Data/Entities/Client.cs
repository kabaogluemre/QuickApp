using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuickApp.Core.Data.Entities
{
    [Table("Clients")]
    public class Client : BaseEntity<int>
    {
        [Required]
        public string ClientId { get; set; }
        [Required]
        public string ClientSecret { get; set; }
        [Required]
        //In minutes
        public int TokenTime { get; set; }
    }
}
