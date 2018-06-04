using System.Collections.Generic;
using CityInfo.API.Models;


namespace CityInfo.API
{
    public class CitiesDataStore
    {
        public static CitiesDataStore Current { get; } = new CitiesDataStore();

        public List<CityDto> Cities { get; set; }

        public CitiesDataStore()
        {
            Cities = new List<CityDto>()
            {
                new CityDto()
                {
                    Id = 1,
                    Name = "New York City",
                    Description = "The one with that big park.",
                    PointOfInterest = new List<PointOfInterestDto>()
                    {
                        new PointOfInterestDto()
                        {
                            Id = 1,
                            Name = "Vauuuuu, vauuuuu",
                            Description = "Goood Vau!"
                        },
                        new PointOfInterestDto()
                        {
                            Id = 2,
                            Name = "UUUUAUUUU",
                            Description = "BIIIIG Uauuuu!"
                        }
                    }
                },
                new CityDto()
                {
                    Id = 2,
                    Name = "Kiev",
                    Description = "Old cathedral."
                },
                new CityDto()
                {
                    Id = 3,
                    Name = "London",
                    Description = "London tower."
                }
            };
        }
    }
}