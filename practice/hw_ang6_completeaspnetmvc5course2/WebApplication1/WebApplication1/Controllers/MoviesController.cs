using System;
using System.Web.Http;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MoviesController : Controller
    {
        // GET: Movies/Random
        public ActionResult Random()
        {
            var movie = new Movie()
            {
                Name = "Shrek!"
            };
//            return View(movie);
//            return Content("Hello world"); // вернет текст "Hello world"
//            return HttpNotFound(); // получим ошибку 404
//            return new EmptyResult(); // получисм на выходе пустую страницу
            return RedirectToAction(actionName: "Index", controllerName: "Home", routeValues: new { page = 1, sortBy = "name"}); // редирект на другую страницу со страницей 1 и сортировкой по имени
        }
        
//        [Route("movies/released/{year}/{month:regex(\\d{2}):range(1, 12)}")]

        public ActionResult Edit(int id)
        {
            return Content(content: "id = " + id); // id  передавать можно как через Movies/edit/1 так и через параметр Movies/edit?id=1 обработается одинаково 
            // id имя айдишки принятое по умолчанию если будет назван по другому так не пройдет, например NameID
        }
// movies
        public ActionResult Index(int? pageIndex, string sortBy)
        {
            if (!pageIndex.HasValue)
                pageIndex = 1;

            if (String.IsNullOrWhiteSpace(value: sortBy))
                sortBy = "Name";

            return Content(content: String.Format(format: "pageIndex={0}&sortBy={1}", arg0: pageIndex, arg1: sortBy));
        }

        public ActionResult ByReleaseYear(int year, int month)
        {
            return Content(content: year + "/" + month);
        }
    }
}