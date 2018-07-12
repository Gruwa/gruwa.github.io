using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication1
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute(url: "{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

//            routes.MapRoute(
//                "MoviesByReleaseDate",
//                "movies/released/{year}/{month}",
//                new {controller = "Movies", action = "ByReleaseDate"},
//                new {year = @"\d{4}", month = @"\d{2}"}// we can write like year = @"2016 | 2017",
//            );

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new {controller = "Home", action = "Index", id = UrlParameter.Optional}
            );
        }
    }
}