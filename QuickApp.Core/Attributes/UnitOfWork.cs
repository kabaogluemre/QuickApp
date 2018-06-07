using System;

namespace QuickApp.Core.Attributes
{
    public class UnitOfWork : Attribute
    {
        public bool DisableTransaction { set; get; }
    }
}
