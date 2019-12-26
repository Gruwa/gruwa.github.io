using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;

namespace OdeToFood3.Pages.Trees
{
    public class ListTree : PageModel
    {
        private readonly IConfiguration _configuration;
        public string TreeMessage { get; set; }

        public ListTree(IConfiguration config)
        {
            this._configuration = config;
        }
        
        public void OnGet()
        {
            TreeMessage = _configuration["Tree"];
        }
    }

}