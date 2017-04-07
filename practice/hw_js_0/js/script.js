'use strict';

// (function($){
//     $(function() {
//
//
//     });
// }(jQuery);


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
// console.log(goods); z
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

// var calculator = {
//     read: function() {
//         this.a = +prompt('Значение 1', '');
//         this.b = +prompt('Значение 2', '');
//     },
//     sum: function() {
//         return this.a + this.b;
//     },
//     mul: function() {
//         return this.a * this.b;
//     }
// }
















// new Date(0) - 0 // 0
// new Array(1)[0] + "" //
// ({})[0]
// [1] + 1 //11
// [1,2] + [3,4] //1.23.4
// [] + null + 1 // "" + null +1 //null1
// [[0]][0][0] //0
// ({} + {})// ""



// var calculator = new Calculator(){
//     this.read = function() {
//         var a = prompt ("Введите число", ""); // this.a = +prompt ("Введите число a", 0);
//         var b = prompt ("Введите число", ""); // this.b = +prompt ("Введите число b", 0);
//     }
//     this.sum = function() {
//         return a + b; //return this.a + this.b;
//     }
//     this.mul = function() {
//         return a * b; //return this.a * this.b;
//     }
//
// }

// var accumulator = new Accumulator(1);
// function Accumulator(startingValue){
//     this.value = startingValue;
//     this.read = function() {
//         this.value += +prompt ("Введите число", "");
//     }
// }
//
// accumulator.read();
// accumulator.read();
// alert( accumulator.value );

// document.head
// document.body.children[1]
// document.body.children[1].lastChild

// if (elem.childrenNodes.length < 0) { //!elem.childrenNodes.length
//         alert ("узел elem пуст");
// }


// var body = document.body;
// var newText = document.createTextNode('Создание списка, Как же это круто!!');
// body.insertBefore(newText, body.firstChild);
// var newUl = document.createElement('ul');
// newUl.className = 'list';
// body.insertBefore(newUl, newText.nextSibling);
//
// NewList();
//
//
//     function NewList() {
//             for (var text = prompt ('Cодержимое пункта', ''); text != null & text != ''; text = prompt ('Cодержимое пункта', '')) {
//                     var newLi = document.createElement('li');
//                     newUl.insertBefore(newLi, newLi.nextSibling);
//                     var newText = document.createTextNode(text);
//                     newLi.insertBefore(newText, newLi.firstChild);
//             }
//             return;
//     }

// var data = {
//     "Рыбы": {
//         "Форель": {},
//         "Щука": {}
//     },
//
//     "Деревья": {
//         "Хвойные": {
//             "Лиственница": {},
//             "Ель": {}
//         },
//         "Цветковые": {
//              "Берёза": {},
//              "Тополь": {}
//          }
//      }
// };
//
// function createTree(container, obj) {
//       container.innerHTML = createTreeText(obj);
//     }
//
// function createTreeDom(obj) {
//       // если нет детей, то рекурсивный вызов ничего не возвращает
//       // так что вложенный UL не будет создан
//       if (isObjectEmpty(obj)) return;
//
//       var ul = document.createElement('ul');
//
//       for (var key in obj) {
//         var li = document.createElement('li');
//         li.innerHTML = key;
//
//         var childrenUl = createTreeDom(obj[key]);
//         if (childrenUl) li.appendChild(childrenUl);
//
//         ul.appendChild(li);
//       }
//
//       return ul;
//     }
//
//
//     function isObjectEmpty(obj) {
//       for (var key in obj) {
//         return false;
//       }
//       return true;
//     }
//
//     var container = document.getElementById('container');
//     createTree(container, data);


//
// function ListWorld() {
//     var newUl = document.createElement('ul');
//     document.body.insertBefore(newUl, document.body.firstChild);
//     for (var key in list) {
//         console.log(key);
//         var newLi = document.createElement('li');
//         newUl.insertBefore(newLi, newLi.nextSibling);
//         newLi.innerHTML = key;
//         console.log( key[i] );
//         // for (var key2 in key) {
//         //     console.log(key2);
//         //     var newLi = document.createElement('li');
//         //     newUl.insertBefore(newLi, newLi.nextSibling);
//         //     newLi.innerHTML = key2;
//         // }
//
//         // if (key != undefined) {
//
//
//         // } else {
//         //     return;
//         // }
//
//
// }
//
//
// }
//
// // var newUl = document.createElement('ul');
// // newUl.parentNode.insertBefore(newUl, newUl.nextSibling);

// var list = document.body.children[1];
// list.insertAdjacentHTML('beforeEnd', '<li>3</li><li>4</li><li>5</li>');


// var input = document.getElementById('hider');
//  input.addEventListener('click', klickButton);
//  function klickButton(){
//    var div = document.getElementById('text');
//    div.style.display = 'none';
//    input.removeEventListener('click', klickButton);
//  }

// var input = document.getElementById('hider');
//  input.addEventListener('click', klickButton);
//  function klickButton(){
//    input.style.display = 'none';
//    input.removeEventListener('click', klickButton);
//  }

// var button = document.querySelector('button');
//    var div = document.getElementsByClassName('pane');
//    for (var i = 0; i < div.length; i++) {
//        var button2 = button.cloneNode(true);
//        button2.style.position = "absolute";
//        button2.style.right = '5px';
//        button2.style.top = '5px';
//        button2.classList.add('button' + i);
//        div[i].appendChild(button2);
//        div[i].style.position = "relative";
//        var body = document.querySelector('body');
//        body.addEventListener('click', klickButton);
//        function klickButton(e){
//            var target = e.target;
//            if (target.tagName != 'BUTTON') return;
//            target.parentElement.style.display = 'none';
//            target.removeEventListener('click', klickButton);
//         }
//    };
//    button.style.display = 'none';
// [20:46:40 | Изменены 20:47:58] Oleg Zmijuk: <script>
// // ищем кнопку по классу, это более точно чем по button
// var removeButton = document.querySelector('.remove-button');
//
// // сразу задаём стили, которые будут в наших кнопках один раз,
// // чтоб не делать это в цикле 3 раза
// removeButton.style.position = "absolute";
// removeButton.style.right = '5px';
// removeButton.style.top = '5px';
//
// var paneList = document.getElementsByClassName('pane');
//
// // циклом вставляем кнопку в каждый блок
// for (var i = 0; i < paneList.length; i++) {
// var buttonCopy = removeButton.cloneNode(true);
// paneList[i].appendChild(buttonCopy);
// paneList[i].style.position = "relative";
// };
//
// removeButton.style.display = 'none';
//
// document.body.addEventListener('click', сlickButton);
//
// function сlickButton(e){
// var target = e.target;
// // если элемент это кнопка для удаления
// if (target.className === 'remove-button') {
// target.parentElement.style.display = 'none';
// target.removeEventListener('click', klickButton);
// };
// }
// </script>
// [20:46:45] Oleg Zmijuk: так будет более правильно
// //


// 'use strict';
//
// var data = {
//             'Вопрос №1' : {
//                 'Вариант ответа №1' : {},
//                 'Вариант ответа №2' : {},
//                 'Вариант ответа №3' : {},
//             },
//             'Вопрос №2' : {
//                 'Вариант ответа №1' : {},
//                 'Вариант ответа №2' : {},
//                 'Вариант ответа №3' : {},
//             },
//             'Вопрос №3' : {
//                 'Вариант ответа №1' : {},
//                 'Вариант ответа №2' : {},
//                 'Вариант ответа №3' : {},
//             },
//     }
//
// var app = {
//         creatTest: function(){
//
//             var div = {
//                 tagName : 'div',
//                 className : ['wrapper'],
//             };
//
//             var head = {
//                 tagName : 'p',
//                 className : ['header', 'page-header'],
//                 content : ('Тест по программированию'),
//             };
//             var content = {
//                 tagName : 'content',
//                 className : ['content'],
//             };
//             var button = {
//                 tagName : 'button',
//                 className : ['btn', 'btn-primary', 'button'],
//             };
//             var ol = {
//                 tagName : 'ol',
//                 className : ['list-group', 'testOl'],
//             };
//             var ul = {
//                 tagName : 'ul',
//                 className : ['list-group', 'clearfix'],
//             };
//             var li = {
//                 tagName : 'li',
//                 className : ['list-group-item'],
//             };
//             var input = {
//                 tagName : 'INPUT',
//                 className : ['input'],
//             };
//
//             var box = new createElement(div);
//             document.body.insertBefore(box, box.nextSibling);
//             var elem = new createElement(head);
//             box.insertBefore(elem, elem.nextSibling);
//             var content = new createElement(content);
//             box.insertBefore(content, content.nextSibling);
//             elem = new createElement(button);
//             box.insertBefore(elem, elem.nextSibling);
//
//             console.log(elem);
//             console.log(input.tagName);
//
//
//             function createElement(config) {
//               var element = document.createElement(config.tagName);
//
//               if (config.className) {
//                   for (var i = 0; i < config.className.length; i++) {
//                      element.classList.add(config.className[i]);
//                  };
//
//               };
//
//               if (config.content) {
//                 element.innerHTML = config.content;
//                 };
//
//               if (config.tagName == 'button') {
//                   var textButton = document.createTextNode('Проверить мои результаты');
//                   element.appendChild(textButton);
//               };
//
//               if (config.tagName == 'INPUT') {
//                   element.setAttribute("type", "checkbox");
//               };
//
//
//               return element;
//             }
//
//             Test(data);
//             TestCheckBox(app);
//
//             function Test(obj) {
//                 for (var key in obj) {
//                     var olList = new createElement(ol);
//                     content.insertBefore(olList, olList.nextSibling);
//                     var liList = new createElement(li);
//                     liList.innerHTML = key; console.log(key);
//                     olList.appendChild(liList);
//                     liList.appendChild(TestLi(obj[key]));
//                     function TestLi(obj2) {
//                         var ulList = new createElement(ul);
//                         for (var key in obj2) {
//                             var liList2 = new createElement(li);
//                             liList2.innerHTML = key;
//                             ulList.appendChild(liList2);
//                         };
//                         return ulList;
//                             }
//                     };
//
//                 }
//                 function TestCheckBox(obj) {
//                         var allLi = document.querySelectorAll('ul > li');
//                         for (var i = 0; i < allLi.length; i++) {
//                             allLi[i].classList.add('listLi' + i);
//                             var inputList = new createElement(input);
//                             allLi[i].insertAdjacentElement("beforeBegin", inputList);
//                         };
//                         var allInput = document.querySelectorAll('ul > input');
//                         for (var i = 0; i < allInput.length; i++) {
//                             allInput[i].classList.add('listInput' + i);
//                         }
//
//                 }
//         }
//     }
//
//
// app.creatTest();

// var listElement = {
//             div: {
//                 'tagName' : {'div' : {}},
//                 'className' : {'wrapper' : {}},
//             },
//             head: {
//                 'tagName' : {'p' : {}},
//                 'className' : {'header' : {}, 'page-header' : {}},
//                 'content' : {'Тест по программированию' : {}},
//             },
//             content: {
//                 'tagName' : {'content' : {}},
//                 'className' : {'content' : {}},
//             },
//             button: {
//                 'tagName' : {'button' : {}},
//                 'className' : {'btn' : {}, 'btn-primary' : {}, 'button' : {}},
//             },
//             ol: {
//                 'tagName' : {'ol' : {}},
//                 'className' : {'list-group' : {}, 'testOl' : {}},
//             },
//             ul: {
//                 'tagName' : {'ul' : {}},
//                 'className' : {'list-group' : {}, 'clearfix:after' : {}},
//             },
//             li: {
//                 'tagName' : {'li' : {}},
//                 'className' : {'list-group-item' : {}},
//             },
//             input: {
//                 'tagName' : {'input' : {}},
//                 'className' : {'input' : {}},
//             },
// };



// ObjElem('div');
//
// var deepCopy = function ObjElem(obj) {
//     for (var key in listElement) {
//         if (key == obj) {
//
//             if (typeof obj != "object") {
//                 return obj;
//             }
//
//             var copy = obj.constructor();
//             for (var key in obj) {
//                 if (typeof obj[key] == "object") {
//                     copy[key] = this.deepCopy(obj[key]);
//                 } else {
//                     copy[key] = obj[key];
//                 }
//             }
//         };
//     };
//     return copy;
// };

// $(document).ready(function(){
//     var element = $('.wrapper')''
// });

// $(function() {
//     // var $element = $('.wrapper')[0];
//     // чистый дом элемент, если есть - [0] (первый элемент,т.к. коллекция)
//     var $element = $('.wrapper');
//     var $par = $element.find('p');
//     $par.addClass('red');
//     $par.css('color', 'white');
//     // можно записать объектом
//     $par.css({
//             color: 'white',
//             background: 'black'
//         });
//     $par.attr('href', 'http://try.jquery.com/')
//     // можно записать кратко так
//     $par
//     .addClass('red');
//     .css({
//             color: 'white',
//             background: 'black'
//         });
//     .attr('href', 'http://try.jquery.com/');
//     // вставка элемента div
//     $('body').append('<div>fdsafsdgsafg</div>');
//     // удаление элемента par
//     $par.remove();
//     // добавление обработчика событий
//     $par.on('click', function(){
//         alert('test');
//     })
//     // удаление обработчика событий
//     $par.off('click', function(){
//         alert('test');
//     })
//     // метод 1 клика, обработчик события , который позволяет сработать 1 раз
//     $par.one('click', function(){
//         alert('test');
//     })
//     // в 1 колбеке можно подписываться на несколько ивентов
//     $par.one('click dblclick', function(){
//         alert('test');
//     })
//
//
//
// });

(function($){
    $(function() {

        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/my/url', true);

        xhr.send();

        xhr.onreadystatechange = function() {
          if (this.readyState != 4) return;

          // по окончании запроса доступны:
          // status, statusText
          // responseText, responseXML (при content-type: text/xml)

          if (this.status != 200) {
            // обработать ошибку
            alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
            return;
          }

          // получить результат из this.responseText или this.responseXML
        }

    });
}(jQuery);
