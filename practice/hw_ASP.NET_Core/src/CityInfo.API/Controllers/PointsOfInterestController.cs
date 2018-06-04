using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    public class PointsOfInterestController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return
            View();
        }
    }
}