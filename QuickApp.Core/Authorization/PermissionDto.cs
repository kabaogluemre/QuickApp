using QuickApp.Core.Localization;

namespace QuickApp.Core.Authorization
{
    public class PermissionDto
    {
        public string ParentName { get; set; }

        public string Name { get; set; }

        public string DisplayName
        {
            get { return LocalizationHelper.GetLocalize(Name); }
        }

        public bool Default { get; set; }

        public string DescriptionKey { get; set; }

        public string Description
        {
            get
            {
                return LocalizationHelper.GetLocalize(DescriptionKey);
            }
        }

        public bool Granted { get; set; }

        public int ChildrenCount { get; set; }

        public PermissionDto()
        {
            Granted = false;
        }
    }
}
