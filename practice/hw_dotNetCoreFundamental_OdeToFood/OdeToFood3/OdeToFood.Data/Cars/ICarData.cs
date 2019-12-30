using System.Collections;
using System.Collections.Generic;
using System.Linq;
using OdeToFood.Core;

namespace OdeToFood.Data
{
    public interface ICarData
    {
        IEnumerable<Car> GetRestByName(string name);

        Car GetById(int id);
    }

    public class InMemoryCarData : ICarData
    {
        private readonly List<Car> _cars;

        public InMemoryCarData()
        {
            _cars = new List<Car>()
            {
                new Car
                {
                    Id = 1,
                    Color = EColorType.Black,
                    Model = EModelType.Mazda,
                    Wheel = EWheelType.Street
                },
                new Car
                {
                    Id = 2,
                    Color = EColorType.Blue,
                    Model = EModelType.Subaru,
                    Wheel = EWheelType.Offroad
                },
                new Car
                {
                    Id = 3,
                    Color = EColorType.Green,
                    Model = EModelType.Toyota,
                    Wheel = EWheelType.Offroad
                },
                new Car
                {
                    Id = 4,
                    Color = EColorType.Red,
                    Model = EModelType.Volvo,
                    Wheel = EWheelType.Street
                }
            };
        }

        public IEnumerable<Car> GetRestByName(string name = null)
        {
            return from c in _cars
                where string.IsNullOrEmpty(name) || c.Model.ToString().Contains(name)
                orderby c.Model
                select c;
        }

        public Car GetById(int id)
        {
            return _cars.SingleOrDefault(c => c.Id == id);
        }
    }
}