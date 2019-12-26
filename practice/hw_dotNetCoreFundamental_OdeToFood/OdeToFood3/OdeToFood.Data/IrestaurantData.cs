using System.Collections;
using System.Collections.Generic;
using System.Linq;
using OdeToFood.Core;

namespace OdeToFood.Data
{
    public interface IrestaurantData
    {
        IEnumerable<Restaurant> GetAll();
    }

    public class InMemoryRestaurantData : IrestaurantData
    {
        readonly List<Restaurant> _restaurants;

        public InMemoryRestaurantData()
        {
            _restaurants = new List<Restaurant>()
            {
                new Restaurant {Id = 1, Name = "It pizzaa", Location = "Kiev", Cuisine = CuisineType.Italian},
                new Restaurant {Id = 2, Name = "In pizzaa", Location = "Lviv", Cuisine = CuisineType.Indian},
                new Restaurant {Id = 3, Name = "Me pizzaa", Location = "Harkiv", Cuisine = CuisineType.Mexican}
            };
        }
        
        public IEnumerable<Restaurant> GetAll()
        {
            return from r in _restaurants
                orderby r.Name
                select r;
        }
    }
}