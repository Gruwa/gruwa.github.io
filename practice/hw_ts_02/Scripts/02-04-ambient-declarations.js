"use strict";
/// <reference path="knockout.d.ts" />
// декларация переменных таких как $ для Jquery (!!нужно подключить .d.ts файл)
var demo;
(function (demo) {
    var name = ko.observable("VAsya Cat");
    var id = ko.observable(1);
    var guy = {
        id: id,
        fullName: name
    };
    var value = guy.fullName();
    console.log(value);
})(demo || (demo = {}));
