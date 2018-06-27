using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MoviesController : Controller
    {
        // GET: Movies/Random
        public ActionResult Index()
        {
            var movie = new Movie()
            {
                Name = "Shrek!"
            };
            return
            View(movie);
        }
    }
}