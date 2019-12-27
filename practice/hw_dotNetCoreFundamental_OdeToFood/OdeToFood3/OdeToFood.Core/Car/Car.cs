namespace OdeToFood.Core.Car
{
    public class Car : ICar
    {
        public int Id { set; get; }
        public EColorType Color { set; get; }
        public EWheelType Wheel { set; get; }
        public EModelType Model { set; get; }
    }
}