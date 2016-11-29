
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
//     alert ('go away!')
// }

// var age = prompt ('Your age', '');
//
// if (age < 14 || age > 90) {
//     alert ('Baf-baf');
// } else {
//     alert ('go away!')
// }

var age = prompt ('Your age', '');

if (age != 14 && age != 90 && age < 14 && age > 90) {
    alert ('Baf-baf');
} else {
    alert ('go away!')
}
