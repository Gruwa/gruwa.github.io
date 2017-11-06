let x = 1;

let y;

let fN = 'John';

let lN: string = 'Papa';

let num1 = 100;
let num2: number = 20;

let wer: number = 8;

function addNum(n1: number, n2: number, n3: number) {
    let result = n1 + n2 + n3;
    let msg = ' Sum is = ' + result;
    alert(msg);
}

addNum(num1, num2, 7);

//--------------lesson 1 ------------------

class Car {
    engine: string;

    constructor( engine: string) {
        this.engine = engine;
    }

    start() {
        alert('Engine started ' + this.engine);
    }

    stop() {
        alert('Engine stopped ' + this.engine);
    }
}

window.onload = function() {
    let car = new Car('V12');
    car.start();
    car.stop();
}