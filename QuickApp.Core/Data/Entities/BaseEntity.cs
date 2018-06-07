namespace QuickApp.Core.Data.Entities
{
    public class BaseEntity<TPrimaryKey>
    {
        public TPrimaryKey Id { get; set; }
    }
}
