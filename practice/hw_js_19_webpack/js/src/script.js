'use strict';
// Подключение всех нужный скрипт файлов
var welcome3 = require('./template').tmpl; // в формате старом
import welcome from './myscript'; // в формате ES2015


// для доступа ко всем переменным в файлах
exports.welcome = welcome;
exports.welcome3 = welcome3;

console.log('welcome3', script);
