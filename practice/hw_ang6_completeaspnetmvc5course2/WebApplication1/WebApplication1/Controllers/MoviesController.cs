using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class MoviesController : Controller
    {
        // GET
        public ActionResult Index()
        {
            return
            View();
        }
    }
}