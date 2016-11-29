// 1. Написать [функцию](https://learn.javascript.ru/function-basics) pow, аналогичную [Math.pow](http://javascript.ru/Math-pow), которая должна возводить указанное число в указанную степень. Указать число и степень пользователь должен через команду [prompt](https://learn.javascript.ru/uibasic). Результат выполнения функции вывести в консоль. Работать с целыми числами, большими, меньшими, и равными нулю. Бесконечности можно не обрабатывать

var number = prompt ('Укажите число', '');
var exponent = prompt ('Укажите степень', '');
var result = Math.pow(number, exponent);
console.log(result);
