namespace OdeToFood.Core.Car
{
    public interface ICar
    {
        int Id { get; set; }
        EColorType Color { get; set; }
        EWheelType Wheel { set; get; }
        EModelType Model { set; get; }
    }
}