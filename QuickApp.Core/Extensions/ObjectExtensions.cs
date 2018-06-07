using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace QuickApp.Core.Extensions
{
    public static class ObjectExtensions
    {
        public static T Clone<T>(this T obj) where T : class
        {
            string tmp = JsonConvert.SerializeObject(obj);
            return JsonConvert.DeserializeObject<T>(tmp);
        }
    }
}
