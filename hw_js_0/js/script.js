
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
