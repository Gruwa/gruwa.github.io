// 1. Написать [функцию](https://learn.javascript.ru/function-basics) pow, аналогичную [Math.pow](http://javascript.ru/Math-pow), которая должна возводить указанное число в указанную степень. Указать число и степень пользователь должен через команду [prompt](https://learn.javascript.ru/uibasic). Результат выполнения функции вывести в консоль. Работать с целыми числами, большими, меньшими, и равными нулю. Бесконечности можно не обрабатывать

// function

var a = prompt ('Укажите число', '');
var b = prompt ('Укажите степень', '');

pow(a, b);

function pow(a, b) {
    for (var c = a, d = 1; d != b; d++) {
            c *= a;
        }
    console.log (c);
    alert (c);
}
