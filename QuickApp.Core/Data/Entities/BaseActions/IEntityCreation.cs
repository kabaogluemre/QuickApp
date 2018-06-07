using System;

namespace QuickApp.Core.Data.Entities.BaseActions
{
    public interface IEntityCreation
    {
        DateTime CreationDate { get; set; }

        int? CreationUserId { get; set; }
    }
}
