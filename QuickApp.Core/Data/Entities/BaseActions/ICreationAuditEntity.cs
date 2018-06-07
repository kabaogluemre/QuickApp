using System;

namespace QuickApp.Core.Data.Entities.BaseActions
{
    public interface ICreationAuditEntity
    {
        DateTime CreationDate { get; set; }
        int CreatorUserId { get; set; }
    }
}
