// 2. Создать программу, которая будет выполнять следующие действия:
// - [Циклом](https://learn.javascript.ru/array#перебор-элементов) заполнить [массив](https://learn.javascript.ru/array) с помощью команды `prompt` в котором будет список из 5-ти любых имен
// - Потом вывести с помощью `prompt` сообщение с просьбой ввести имя пользователя
// - Введенное имя, циклом [сравнивать](https://learn.javascript.ru/ifelse) с именами в массиве
// - Если нет совпадения, то есть введенное имя пользователя не существует в массиве - выдавать с помощью `alert` сообщение об ошибке
// - Если есть совпадение - выводить сообщение "Андрей, вы успешно вошли". Вместо "Андрей" должно быть имя текущего пользователя

var list = [];
list.lenght = 5;

for (var i = 0; i < list.lenght; i++) {
    list[i] = prompt ("Введите имя", '');
}
console.log(list);

var name = prompt ("Введите имя пользователя", '');

login(name);

function login(name) {
    for (var i = 0; i < list.length; i++) {
        if (name == list[i]){
            return alert(name + ", Вы успешно авторизированы");
            }
        }
    return alert( "Ошибка авторизации");
    }
