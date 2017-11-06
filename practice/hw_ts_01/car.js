"use strict";
var x = 1;
var y;
var fN = 'John';
var lN = 'Papa';
var num1 = 100;
var num2 = 20;
var wer = 8;
function addNum(n1, n2, n3) {
    var result = n1 + n2 + n3;
    var msg = ' Sum is = ' + result;
    alert(msg);
}
addNum(num1, num2, 7);
//--------------lesson 1 ------------------
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.start = function () {
        alert('Engine started ' + this.engine);
    };
    Car.prototype.stop = function () {
        alert('Engine stopped ' + this.engine);
    };
    return Car;
}());
window.onload = function () {
    var car = new Car('V12');
    car.start();
    car.stop();
};
