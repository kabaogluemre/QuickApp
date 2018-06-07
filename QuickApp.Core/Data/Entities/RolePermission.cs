using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuickApp.Core.Data.Entities.BaseActions;

namespace QuickApp.Core.Data.Entities
{
    [Table("RolePermissions")]
    public class RolePermission : BaseEntity<int>, IEntityCreation
    {
        [Required]
        public int RoleId { get; set; }
        [Required]
        public string PermissionName { get; set; }
        [Required]
        public bool IsGranted { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }

        public int? CreationUserId { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
    }
}
