using System.Collections;
using System.Collections.Generic;
using System.Linq;
using OdeToFood.Core;
using OdeToFood.Core.Restaurant;

namespace OdeToFood.Data
{
    public interface IrestaurantData
    {
        IEnumerable<Restaurant> GetRestByName(string name);
        Restaurant GetById(int id);
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

        public IEnumerable<Restaurant> GetRestByName(string name = null)
        {
            return from r in _restaurants
                where string.IsNullOrEmpty(name) || r.Name.Contains(name)
                orderby r.Name
                select r;
        }

        public Restaurant GetById(int id)
        {
            return _restaurants.SingleOrDefault(r => r.Id == id);
        }
    }
}