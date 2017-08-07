"use strict";
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.start = function () {
        alert('Engine started' + this.engine);
    };
    Car.prototype.stop = function () {
        alert('Engine stopped' + this.engine);
    };
    return Car;
}());
window.onload = function () {
    var car = new Car('V12');
    car.start();
    car.stop();
};
