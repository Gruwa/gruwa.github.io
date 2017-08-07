"use strict";
var demo_02_05;
(function (demo_02_05) {
    //any
    var data;
    var info;
    var doSomething = function (arg) {
        return arg;
    };
    var x = doSomething(5);
    //primitives
    var age = 21;
    var score = 43.56;
    var rating = 99.99;
    var hasData = true;
    var hasData2 = true;
    var isBald = function () { return 'yea'; };
    var hasDer = !!isBald;
    // знаки восклицания впереди переводят значение в boolean, ! - false, !! - true
    var firstN = 'Hoha';
    var lastN = 'Fofa';
    // string array
    function getArrayLength(x) {
        var len = x[0].length;
        return len;
    }
    var names = ['asd', 'fsdf', 'dsf', 'ytytr'];
    var firstPerson = names[0];
    console.log(getArrayLength(names));
    // null
    var getSal = null;
    var animal = null;
    // let orderDate: Date = null;
    //undefined
    var quant;
    var comp = undefined;
    console.log(quant);
    console.log(comp);
})(demo_02_05 || (demo_02_05 = {}));
