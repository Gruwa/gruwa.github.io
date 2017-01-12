
// var user = prompt('Name', 'default');
//
// alert (user);
//
// console.log ('Name', user);

// var js = prompt ('Каково «официальное» название JavaScript?', '');
//
// if (js == 'ECMAScript') {
//     alert ('Верно!');
// } else {
//     alert ('Не знаете? «ECMAScript»!');
// }

// var js = prompt ('Введите число', '');
// if (js > 0) {
//     alert (1);
// } else if (js < 0){
//     alert (-1);
// } else {
//     alert (0);
// }

// var login = prompt ('Введите логин', '');
// if (login == 'Админ') {
//     var pas = prompt ('Введите пароль', '');
//     if (pas == 'Чёрный Властелин') {
//         alert ('Добро пожаловать!')
//     } else if (pas == null) {
//     alert ('Вход отменен');
// } else {
//     alert ('Пароль не верен');
// }
// } else if (login == null) {
//     alert ('Вход отменен');
// } else {
//     alert ('Я Вас не знаю');
// }

// if (a + b < 4) {
//   result = 'Мало';
// } else {
//   result = 'Много';
// }
//
// var number = (a + b < 4) ? 'Мало' : 'Много';

// var message;
//
// if (login == 'Вася') {
//   message = 'Привет';
// } else if (login == 'Директор') {
//   message = 'Здравствуйте';
// } else if (login == '') {
//   message = 'Нет логина';
// } else {
//   message = '';
// }
//
// var message = (login == 'Вася') ? 'Привет' :
// (login == 'Директор') ? 'Здравствуйте' :
// (login == '') ? 'Нет логина' :
// '';

// var age = prompt ('Your age', '');
//
// if (age == 14 || age > 14 && age < 90 || age == 90) {
//     alert ('Baf-baf');
// } else {
//     alert ('go away!');
// }

// var age = prompt ('Your age', '');
//
// if (age < 14 || age > 90) {
//     alert ('Baf-baf');
// } else {
//     alert ('go away!');
// }

// var age = prompt ('Your age', '');
//
// if (!(age == 14 || age > 14 && age < 90 || age == 90)) {
//     alert ('Baf-baf');
// } else {
//     alert ('go away!');
// }

// "" + 1 + 0 // '10'
// "" - 1 + 0 // -1
// true + false // 1
// 6 / "3" // 2
// "2" * "3" // 6
// 4 + 5 + "px" // '9px'
// "$" + 4 + 5 // '$9' (baran stroka - '$45')
//
// "4" - 2 // 2
//
// "4px" - 2 // 2  (NaN , Т.к. в строке кроме цифр еще есть буквы и привести к йифре не получается без доп команд)
//
// 7 / 0 // NaN (ПРавильно - Infinity - бесконечность)
//
// "  -9\n" + 5 // '-9\n5'
// "  -9\n" - 5 // -14 (\n - это перенос на следующую строку)
// 5 && 2 // 2
//
// 2 && 5 // 5
//
// 5 || 0 // 5
//
// 0 || 5 // 5
// null + 1 // 1
// undefined + 1 // NaN + 1 ili (1) ( если к NaN добавлять число будет всегда - NaN (not a number))
// null == "\n0\n" // true 0==0 (не правильно, ответ false, т.к. При сравнении == с null преобразования не происходит, есть жёсткое правило: null == undefined и только)
// +null == +"\n0\n" // true 0==0

// var i = 0;
// while (++i < 5) alert( i ); // 1 2 3 4

// var i = 0;
// while (i++ < 5) alert( i ); // 1 2 3 4 5

// for (var i = 0; i < 5; i++) alert( i ); // 0 1 2 3 4

// for (var i = 0; i < 5; ++i) alert( i ); // 0 1 2 3 4

// for (var i = 2; i <= 10; i++) {
//     if (i % 2 != 0) continue;
//     alert(i);
//     }

// for (var i = 0; i < 3; i++) {
//   alert( "номер " + i + "!" );
// }

// var i = 0;
// do {
//     alert( "номер " + i + "!" );
//     i++;
// } while (i < 3)


// do {
//     var i = prompt ('Введите число больше 100', '');
//     if (i > 100) continue;
// }while (i <= 100); - не правильно
// должно быть так:
// do {
//  var num = prompt("Введите число больше 100?", 0);
// } while (num <= 100 && num != null)            ;

// var a = prompt ('Введите начало интервала простых чисел', '');
// var b = prompt ('Введите конец интервала простых чисел', '');
//
// while (a <= b, a > 1, b > 1, a != null, b != null) {
//     for (var i = a; i <= b; i++) {
//
//         for (var d = 2, k = i - 1; d == k; i++, d++) {
//         if (k % d == 0) {
//                 continue;
//         }
//             }
//
//      console.log(i);
// }
// }
//
// if (a > b, a < 1, b < 1) {
//     alert ('Интервал ошибочен, введите значения заново');
// }
// }

// for (var i = 2; i <= 10; i++) {
//
//     // for (var d = 2, k = i - 1; d == k; d++) {
//     // if (k % d == 0) {
//     //         continue;
//     // }
//     //     }
//
// if (i % m == 0) {
//         continue;
// }
// alert (i);
// }


// if (browser == 'ie') {
//     alert('О, да у Вас IE!');
// } else
//     if (browser == 'Chrome' || browser == 'Firefox' || browser == 'Safari' || browser == 'Opera') {
//     alert( 'Да, и эти браузеры мы поддерживаем' );
// } else {
//     alert( 'Мы надеемся, что и в вашем браузере все ок!' );
// }
// забыл поставить  || и browser ==

// var a = +prompt('a?', '');
// switch (a) {
//     case 0:
//     alert( 0 );
//         break;
//     case 1:
//     alert( 1 );
//         break;
//     case 2:
//     case 3:
//     alert( '2, 3' );
//         break;
// }



// function checkAge(age) {
//     var yourAge = (age > 18) ? true : confirm('Родители разрешили?');
// }
// не верно
// function checkAge(age) {
//     var yourAge = (age > 18) || false;
// }
// не верно
//
// Надо так
// function checkAge(age) {
//   return (age > 18) ? true : confirm('Родители разрешили?');
// }
//
// function checkAge(age) {
//   return (age > 18) || confirm('Родители разрешили?');
// }

// function min(a, b) {
//     if ( a <= b ) {
//         return a;
//     } else {
//         return b;
//     }
// }
//
// function min(a, b) {
//     return (a < b) ? a : b;
// }
// наконец то.. хоть что-то

// var a = prompt ('Укажите число', '');
// var b = prompt ('Укажите степень', '');
//
// if (b < 1) {
//     alert ('Введите степень больше 1, а не ' + b)
// } else {
//     pow(a, b);
// }
//
//
// function pow(a, b) {
//
//     for (var c = a, d = 1; d != b; d++) {
//             c = c * a;
//         }
//     console.log (c);
//     alert (c);
// }

// условие для чисел больше 1 забыл (доделал)

// 1.
    // var n = +prompt ('Укажите число', '');
    //  var k = n;
    // alert ( sumTo(n, k) );
    //
    //     function sumTo(n, k) {
    // for (; n > 1; n--) {
    //     k = k + n-1;
    // }
    //     return k;
    // }

// 2.
// var n = +prompt ('Укажите число', '');
// alert( sumTo(n) );
//
// function sumTo(n) {
//   if (n > 1) { // пока n > 1, сводить вычисление pow(n) к pow(n-1)
//     return n + sumTo(n - 1);
//   } else {
//     return n;
//   }
// }

// 3.
// var n = +prompt ('Укажите число', '');
// var k = 1;
// alert( sumTo(n, k) );
//
// function sumTo(n, k) {
//     k = (n * (n + 1)) / 2;
//     return k;
// }
// console.log(k);
//
// (можно написать короче
// function sumTo(n) {
// return n * (n + 1) / 2;
// }
// alert( sumTo(n) );
// )

// var n = +prompt ('Укажите число', '');
// alert( fact(n) );
//
// function fact(n) {
//   if (n == 1) {
//     return 1;
// } else if (n == 0){
//     return 0;
// } else {
//         console.log( fact(n-1) );
//     return fact(n - 2) + fact(n - 1);
//
// }
// }
//     console.log( fact(n) );

// var n = +prompt ('Укажите число', '');
//     if ( fib(n) <= 0 || fib(n) >= 0) {
//         alert( fib(n) );
//     }else {
//         alert ('Укажите число!');
//     }
//
//
// function fib(n){
//     if (n == 0) {
//         return 0;
//     } else
//     if (n == 1 || n == -1) {
//         return 1;
//     } else if (n >= 2) {
//         return fib(n - 1) + fib(n - 2);
//     } else if (n <= -2){
//         return fib(n + 2) - fib(n + 1);
//     } else {
//         return;
//     }
//
// }

// function pow(x, n) {
//   var result = 1;
//   for(var i = 0; i < n; i++) {
//       result *= x;
//   }
//   return result;
// }
// var x = prompt("x?", '');
// var n = prompt("n?", '');
// if (n < 0) {
//   alert('Степень ' + n + 'не поддерживается, введите целую степень, большую 0');
// } else {
//   alert( pow(x, n) );
// }

 // var n = +prompt ('Укажите число', '');
 // var m = +prompt ('Укажите число', '');
 //
 // if ( isNumeric(n, m) == true) {
 //      alert( n + m );
 // } else {
 //     alert( 'Попробуйте еще раз' );
 // }
 //
 // function isNumeric(n, m) {
 //   return !isNaN( parseFloat( n + m ) ) && isFinite( n + m );
 // }

// alert( 6.35.toFixed(1) );

// var result = 0.16 + 0.2;
// alert( +result.toFixed(10) + '$' );

// var i = 0;
// while (i != 10) {
//   i += 0.2;
//   console.log(i);
// }

// Как получить дробную часть числа?

// var n = +prompt ('Введите дробноеое число', '');
// var m = n;
// var k = -n;

// console.log('m=', m);
// console.log('k=', k);
// console.log( 'округленное до целого k=', Math.floor(k) );
// console.log( 'округленное до целого n=', Math.floor(n) );

// if ( isNumeric( n ) == true || n >= 0 ) {
//     alert ( ( n - Math.floor( n ) ).toFixed(10) );
// } else if (isNumeric( n ) == true || n < 0 ) {
//
//     alert ( ( Math.floor( -n ) + n ).toFixed(10) );
//
// } else {
//     alert( 'Попробуйте еще раз' );
// }
//
// function isNumeric( n ) {
//   return !isNaN( parseFloat( n ) ) && isFinite( n );
// }
// //(с минусом работает некоррррректно)

// Вариант 2 короче

// var n = +prompt ('Введите дробноеое число', '');


//  var n = +prompt ('Введите дробноеое число', '');
//        alert ( getDecimal(n) );
//
// function getDecimal(n) {
// if (n >= 0) {
//        return ( n - Math.floor( n ) ).toFixed(10);
// } else {
//         return ( Math.floor( -n ) + n ).toFixed(10);
// }
// }

// !!! Формула Бине

// var n = +prompt ('Введите число', '');
//
// alert ( fibBinet(n) );
//
// function fibBinet(n) {
//     return Math.round( ( Math.pow( ( (1 + Math.sqrt(5) ) / 2 ), n ) ) / Math.sqrt(5) );
// }

// // Случайное из интервала (min, max)
//
// var min = 5,
//   max = 10;
//
// alert( min + Math.random() * (max - min) );

// // Случайное целое из интервала (min, max)
//
// var n = +prompt ('Введите min', '');
// var m = +prompt ('Введите max', '');
//
// console.log( randomInteger( n, m ) );
//
// function randomInteger( n, m ) {
//     return Math.round( n + Math.random() * (m - n) );
// }
//
// // Для метода округления нужно проверять диапазон на минимальном диапазоне, что бы вероятность округления была у всех в диапазхоне одинаковая. (минимальный диапазон от 1 до 3, у 1 вероятность - 0.5, у 2 - 1, у 3 вероятность 0.5) Тут не учел диапазон нужно к максимуму прибавить 0.5 от минимума отнять 0.5

// // Сделать первый символ заглавным
//
// var str = prompt ('Введите текст', '');
//
// console.log( ucFirst(str) );
//
// function ucFirst(str){
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// // Проверьте спам
//
// var str = prompt ('Введите текст', '');
// var target1 = 'viagra';
// var target2 = 'xxxxx';
// console.log( checkSpam(str) );
//
// function checkSpam(str){
//     str = str.toLowerCase();
//
//     if (~str.indexOf('viagra') || ~str.indexOf('xxxxx') ) {
//         return true;
//     } else {
//         return false;
//     }
// }
//
// // или так function checkSpam(str) {
// //   var lowerStr = str.toLowerCase();
// //
// //   return !!(~lowerStr.indexOf('viagra') || ~lowerStr.indexOf('xxx'));
// // }

// // Усечение строки
//
// var str = prompt ('Введите текст', '');
// var maxlength = +prompt ('Введите максимальную длину строки', '');
// console.log( truncate(str, maxlength) );
//
// function truncate(str, maxlength) {
//     if ( str.length > maxlength ) {
//         return str.slice(0, maxlength - 3) + '...';
//     } else {
//         return str;
//     }
//     }
//
// // // или так
// // function truncate(str, maxlength) {
// //     return str.length > maxlength ? str.slice(0, maxlength - 3) + '...' : str;
// //     }

// // Выделить число
//
// var str = '$' + prompt ('Введите число', '');
//
// console.log( str );
// console.log( extractCurrencyValue(str) );
//
// function extractCurrencyValue(str) {
//     return str.slice(1);
// }

// // Первый объект
//
// var user {};
// user.name = 'Вася';
// user.surname = 'Петров';
// user.name = 'Сергей';
// delete user.name;

// Определите, пуст ли объект

// function isEmpty(obj) {
//   for (var key in obj) {
//       return false;
//   }
//  return true;
// }
//
// var schedule = {};
//
// alert( isEmpty(schedule) ); // true
//
// schedule["8:30"] = "подъём";
//
// alert( isEmpty(schedule) ); // false

// // Сумма свойств
//
// "use strict";
// var salary = 0;
// var salaries = {
//   "Вася": 100,
//   "Leся": 200,
//   "Петя": 300,
//   "Даша": 250
// };
//
// function isEmpty(obj) {
//   for (var key in obj) {
//     salary = salary + obj[key];
//     // можно записать sum += salaries[name];
//   }
//         return salary;
//  }
//
// console.log( isEmpty(salaries) );
//
// //... ваш код выведет 650

// // Свойство с наибольшим значением
//
//  "use strict";
// var salary = 0, name;
// var salaries = {
//   "Вася": 100,
//   "Leся": 200,
//   "Петя": 300,
//   "Даша": 250
// };
//
// function isEmpty(obj) {
//   for (var key in obj) {
//     if (salary < obj[key]) {
//         name = key;
//         salary = obj[key];
//       }
//     }
//     if (salary > 0) {
//         return name;
//     } else {
//         return name = 'нет сотрудников';
//     }
//
//  }
//
// console.log( isEmpty(salaries) );

// // Умножьте численные свойства на 2
//
// "use strict";
// var salary = 0, name;
// var menu = {
//   width: 200,
//   height: 300,
//   height1: 650,
//   height2: 150,
//   title: "My menu"
// };
//
// function isNumeric(n) {
//   return !isNaN(parseFloat(n)) && isFinite(n)
// }
//
// function isEmpty(obj) {
//  for (var key in obj) {
//      if ( isNumeric( obj[key] ) ) {
//          obj[key] = 2 * obj[key];  //можно записать obj[key] *= 2;
//          console.log( isNumeric( obj[key] ) );
//          console.log( obj[key] );
//      }
//    }
//
//        return obj;
// }
//
// console.log( isEmpty(menu) );

// // Получить последний элемент массива
//
// var goods = ["Яблоко", "Груша", "Слива"];
// var t = goods.pop();
// console.log(t);
// console.log(goods);
// goods.push(t);
// console.log(goods);
// // второй вариант  var lastItem = goods[goods.length - 1];

// // Добавить новый элемент в массив
//
// var goods = ["Яблоко", "Груша", "Слива"];
// goods.push('Компьютер');
// console.log(goods);

// // Создание массива
//
// var styles = ['Джаз', 'Блюз'];
// console.log(styles);
// styles.push('Рок-н-Ролл');
// console.log(styles);
// styles[styles.length - 2] = 'Классика';
// console.log(styles);
// styles.shift(); alert( styles );
// console.log(styles);
// styles.unshift( 'Рэп', 'Регги' );
// console.log(styles);

// // Получить случайное значение из массива
//
// var rand = 0 + Math.floor(Math.random() * (3 + 1 - 0)); //для универсальности можно написать var rand = 0 + Math.floor(Math.random() * (arr.length - 1 + 1 - 0));
// console.log(rand);
// var arr = ["Яблоко", "Апельсин", "Груша", "Лимон"];
// alert( arr[rand] );

// // Создайте калькулятор для введённых значений
// var numbers = [];
// var numb, t = 0;
//
// function isNumeric(n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// }
//
// function functionName(numb) {
//     while ( isNumeric( numb = prompt ('Введите число', '') ) ) {
//   numbers.push(numb);
// }
// console.log(numbers);
//     for (var i = 0; i < numbers.length; i++) {
//         t = t + +numbers[i]; //Записать можно так t += numbers[i];
//         console.log(t);
// }
//     return t;
// }
// console.log( functionName(numb) );

// // Поиск в массиве
//
// var arr = ["test", 2, 1.5, false];
// var value = prompt ('Введите значение', '');
//
// function find(arr, value) {
//     for (var i = 0; i < arr.length; i++) {
//             if ( value == arr[i] ) {
//                 return value;
//             }
//             }
//             return -1;
//     }
//
//
// console.log( find(arr, value) );

// // Фильтр диапазона
//
//
// var arr = [5, 4, 7, 8, 0, 8, 3, 6, 2, 11, 75, 44, 5, 21, 57, 84];
// var filter = [];
//
// console.log( filterRange(filter, 3, 5) );
//
//         function filterRange(filter, a, b) {
//             for (var key in arr) {
//           filter[key] = arr[key];
//             }
//             for (var key in filter) {
//                  if ( a > filter[key] || filter[key] > b ) {
//                      delete filter[key];
//                  }
//          }
//          return filter;
// }

// // Сделать pow по спецификации
// // проверка функции pow
// function pow(x, n) {
//   var result = 1;
//   if ( parseInt(n) != n ) { // можно (Math.round(n) != n)
//      return NaN;
//   } else if (n > 0) {
//   for (var i = 0; i < n; i++) {
//     result *= x;
//   }
//   } else if (n < 0){
//     return NaN;
//   }
//
//   return result;
// }

// // Перепишите цикл через map
//
// var arr = ["Есть", "жизнь", "на", "Марсе"];
//
// // var arrLength = [];
// // for (var i = 0; i < arr.length; i++) {
// //   arrLength[i] = arr[i].length;
// // }
//
// var arrLength = arr.map( function(name) {
//         return name.length;
// });
//
// alert( arrLength ); // 4,5,2,5

function f(undefined,8,9,0);

function f(x) {
        for (var i = 0; i < arguments.length; i++) {
             alert arguments[i] || arguments[i] === undefined ? 1 : 0;
        }
}
