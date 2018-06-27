using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

namespace WebApplication1
{
    public class Global : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(configurationCallback: WebApiConfig.Register);
            RouteConfig.RegisterRoutes(routes: RouteTable.Routes);
        }
    }
}