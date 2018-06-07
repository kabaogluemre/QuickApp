using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QuickApp.Core.Data.Entities.BaseActions;

namespace QuickApp.Core.Data.Entities
{
    [Table("Users")]
    public class User : BaseEntity<int>, IWriteHistoryLogs,IBeforeUpdate, IEntityCreation
    {
        [MaxLength(50)]
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [MaxLength(50)]
        [Required]
        public string FirstName { get; set; }
        [MaxLength(50)]
        [Required]
        public string LastName { get; set; }
        [MaxLength(250)]
        [Required]
        public string EmailAddress { get; set; }
        [MaxLength(100)]
        public string EmployeeNumber { get; set; }
        [MaxLength(100)]
        public string Location { get; set; }
        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsSystemUser { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        public int? CreationUserId { get; set; }


        public virtual ICollection<Role> Roles { get; set; }

        public void Action()
        {
            //Apply some action on before update the entity
        }

        public User()
        {
            IsActive = true;
            IsSystemUser = false;
            Roles = new List<Role>();
        }
    }
}
