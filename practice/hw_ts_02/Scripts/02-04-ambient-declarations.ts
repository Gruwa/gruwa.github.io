/// <reference path="knockout.d.ts" />
declare var ko: KnockoutStatic; 
// декларация переменных таких как $ для Jquery (!!нужно подключить .d.ts файл)

module demo {
    let name = ko.observable("VAsya Cat");
    let id = ko.observable(1);
    let guy = {
        id: id,
        fullName: name
    };

    let value: string = guy.fullName();
    console.log(value);
    
}