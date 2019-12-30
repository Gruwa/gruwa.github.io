using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using OdeToFood.Core;
using OdeToFood.Data;

namespace OdeToFood3.Pages.Cars
{
    public class ListCarsModel : PageModel
    {
        private readonly IConfiguration _config;
        private readonly ICarData _carData;

        public string CarName { get; set; }
        public IEnumerable<Car> Cars { get; set; }

        public string SearchTermCar { get; set; }
        
        public ListCarsModel(IConfiguration config, ICarData carData)
        {
            this._config = config;
            this._carData = carData;
        }

        public void OnGet()
        {
            CarName = _config["Car"];
            Cars = _carData.GetRestByName(SearchTermCar);
        }
    }
}
