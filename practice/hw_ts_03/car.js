/// <reference path="toastr.d.ts" />
/// <reference path="jquery.d.ts" />
var Shapes;
(function (Shapes) {
    // интерфейс можно записать еще так, т.к. внутри его надо экспортировать из коробки,
    // но при этом обращаться к ниму нужно уже как свойству Shapes, т.е. Shapes.IRectangle, т.е.
    // let rect: Shapes.IRectangle = new Shapes.Rectangle(2, 15); 
    // export interface IRectangle {
    //     height: number;
    //     width: number;
    //     getArea(): number;
    // }
    var Rectangle = (function () {
        function Rectangle(height, width) {
            this.height = height;
            this.width = width;
        }
        Rectangle.prototype.getArea = function () { return this.height * this.width; };
        return Rectangle;
    }());
    Shapes.Rectangle = Rectangle;
})(Shapes || (Shapes = {}));
var rect = new Shapes.Rectangle(2, 15);
var area = rect.getArea();
toastr.info("area = " + area);
// -----------lesson 3 -------------
// class Engine {
//     constructor(public horsePower: number, public engineType: string) {
//     }
// }
// class Car {
//     private _engine: Engine;
//     constructor(engine: Engine) {
//         this.engine = engine;
//     }
//     get engine(): Engine {
//         return this._engine;
//     }
//     set engine(value: Engine) {
//         if (value == undefined) throw 'Please supply an engine';
//         this._engine = value;
//     }
//     start() : void{
//         alert('Car eng SARTING ' + this._engine.engineType);
//     }
// }
// window.onload = function(){
//     let engine = new Engine(300, 'V16');
//     let car = new Car(engine);
//     alert(car.engine.engineType);
//     car.start();
// }; 
