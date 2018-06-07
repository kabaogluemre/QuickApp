using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QuickApp.Core.Data.Entities.BaseActions;

namespace QuickApp.Core.Data.Entities
{
    [Table("Roles")]
    public class Role : BaseEntity<int>, IEntityCreation
    {
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public bool IsSystemRole { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }

        public int? CreationUserId { get; set; }

        public virtual ICollection<User> Users { get; set; }

        public Role()
        {
            IsActive = true;
            IsSystemRole = false;
        }
    }
}
