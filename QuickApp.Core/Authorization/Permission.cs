using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using QuickApp.Core.Exceptions;
using QuickApp.Core.Localization;

namespace QuickApp.Core.Authorization
{
    public class Permission
    {
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
                if (string.IsNullOrEmpty(DescriptionKey))
                {
                    return "";
                }
                return LocalizationHelper.GetLocalize(DescriptionKey);
            }
        }
        [JsonIgnore]
        public Permission Parent { get; private set; }

        private readonly List<Permission> _children;
        [JsonIgnore]
        public List<Permission> Children
        {
            get { return _children; }
        }

        public Permission(string name, string descriptionKey, bool isGrantedByDefault = false)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException("You should specify name");
            }
            Name = name;
            Default = isGrantedByDefault;
            DescriptionKey = descriptionKey;
            _children = new List<Permission>();
        }

        public IEnumerable<Permission> Descendants()
        {
            var root = this;
            var nodes = new Stack<Permission>(new[] { root });
            while (nodes.Any())
            {
                Permission node = nodes.Pop();
                yield return node;
                foreach (var n in node.Children) nodes.Push(n);
            }
        }

        public Permission CreateChild(string name, string descriptionKey, bool isGrantedByDefault = false)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException("You should specify name");
            }
            var permission = new Permission(name, descriptionKey, isGrantedByDefault) { Parent = this };
            _children.Add(permission);
            return permission;
        }
    }
}
