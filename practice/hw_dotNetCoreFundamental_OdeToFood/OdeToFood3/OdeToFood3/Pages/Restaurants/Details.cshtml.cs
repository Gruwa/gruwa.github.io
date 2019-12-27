using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OdeToFood.Core.Restaurant;
using OdeToFood.Data;


namespace OdeToFood3.Pages.Restaurants
{
    public class DetailsModel : PageModel
    {
        private readonly IrestaurantData restaurantData;
        public Restaurant Restaurant { get; set; }

        public DetailsModel(IrestaurantData restaurantData)
        {
            this.restaurantData = restaurantData;
        }
        public IActionResult OnGet(int restaurantId)
        {
            Restaurant = restaurantData.GetById(restaurantId);

            if (Restaurant == null)
            {
                return RedirectToPage("./../Common/NotFound");
            }

            return Page();
        }
    }
}