using System.Web.Optimization;

namespace QuickApp.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/metroniccss").Include(
                      "~/metronic/global/plugins/font-awesome/css/font-awesome.min.css",
                      "~/metronic/global/plugins/simple-line-icons/simple-line-icons.min.css",
                      "~/metronic/global/plugins/bootstrap/css/bootstrap.min.css",
                      "~/metronic/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css",
                      "~/metronic/global/plugins/fullcalendar/fullcalendar.min.css",
                      "~/metronic/global/css/components.css",
                      "~/metronic/global/css/plugins.css",
                      "~/metronic/admin/layout/css/layout.css",
                      "~/metronic/admin/layout/css/themes/default.css",
                      "~/metronic/admin/layout/css/custom.css",
                      "~/metronic/global/plugins/bootstrap-toastr/toastr.min.css",
                      "~/metronic/global/plugins/jstree/dist/themes/default/style.min.css"));

            bundles.Add(new ScriptBundle("~/metronicscripts").Include(
                  "~/metronic/global/plugins/jquery-ui/jquery-ui.min.js",
                  "~/metronic/global/plugins/bootstrap/js/bootstrap.min.js",
                  "~/metronic/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js",
                  "~/metronic/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
                  "~/metronic/global/plugins/jquery.blockui.min.js",
                  "~/metronic/global/plugins/jquery.pulsate.min.js",
                  "~/metronic/global/plugins/bootstrap-daterangepicker/moment.min.js",
                  "~/metronic/global/plugins/bootstrap-daterangepicker/daterangepicker.js",
                  "~/metronic/global/plugins/fullcalendar/fullcalendar.min.js",
                  "~/metronic/global/plugins/bootstrap-toastr/toastr.min.js",
                  "~/metronic/global/scripts/metronic.js",
                  "~/metronic/global/scripts/ui-toastr.js",
                  "~/metronic/global/plugins/jstree/dist/jstree.js"));
        }
    }
}
