using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood3.Pages.Cars
{
    public class DetailsCar : PageModel
    {
        private readonly ICarData _carData;
    
        public Car Car { get; set; }

        public DetailsCar(ICarData carData)
        {
            _carData = carData;
        }

        public IActionResult OnGet(int carId)
        {
            Car = _carData.GetById(carId);

            if (Car == null)
            {
                return RedirectToPage("./../Common/NotFound");
            }

            return Page();
        }
    }
}