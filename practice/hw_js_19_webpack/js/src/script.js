'use strict';
// Подключение всех нужный скрипт файлов
import welcome from './myscript'; // в формате ES2015
let welcome1 = require('./google');
let welcome2 = require('./jquery.bxslider');
var welcome3 = require('./template'); // в формате старом

// для доступа ко всем переменным в файлах
exports.welcome = welcome;
exports.welcome1 = welcome1;
exports.welcome2= welcome2;
exports.welcome3 = welcome3;
