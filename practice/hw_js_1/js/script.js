// 1. Написать [функцию](https://learn.javascript.ru/function-basics) pow, аналогичную [Math.pow](http://javascript.ru/Math-pow), которая должна возводить указанное число в указанную степень. Указать число и степень пользователь должен через команду [prompt](https://learn.javascript.ru/uibasic). Результат выполнения функции вывести в консоль. Работать с целыми числами, большими, меньшими, и равными нулю. Бесконечности можно не обрабатывать

// function

var a = prompt ('Укажите число', '');
var b = prompt ('Укажите степень', '');

pow(a, b);

function pow(a, b) {
    for (var c = a, d = 1; d != b; d++) {
            if (b == 0)  {
                return alert (c = 1);
            } else if (a == 0 || b === -Infinity) {
                return alert (c = 0);
            } else if (a === Infinity || b === Infinity) {
                return alert (c = Infinity);
            } else if (a === -Infinity && b / 2 == Math.round(b / 2)) {
                return alert (c = Infinity);
            } else if (a === -Infinity && b / 2 != Math.round(b / 2)) {
                return alert (c = -Infinity);
            } else if (Math.abs(b) != b) {
                b = -b;
                return alert (c = 1 / pow(a, b));
            } else {
                c *= a;
            }

        }

    console.log (c);
    return alert (c);
}
