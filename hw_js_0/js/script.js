
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
//
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
