using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;

namespace OdeToFood3.Pages.Cars
{
    public class ListCarsModel : PageModel
    {
        private readonly IConfiguration config;

        public string CarName;

        public ListCarsModel(IConfiguration config)
        {
            this.config = config;
        }

        public void OnGet()
        {
            CarName = config["Car"];
        }
    }
}
