'use strict';

// const _ = require('lodash');
// const jqueryui = require('jqueryui');

import google from './routes/google';
import bxslider from './routes/bxslider';
import myscript from './routes/myscript'; // запись на ES6
import template from './routes/template';
const serverData = require('./routes/server');// запись на ES5
// // const myscript = require('./myscript'); // запись на ES5
// // const UglifyJSPlugin = require('./UglifyJSPlugin');
google();
bxslider();
myscript();

//======
// let moduleName = location.pathname.slice(1);
// let route = require("./routes/" + moduleName); // автоматическая подгрузка модулей с указанной директорииб вместо забитых руками выше каждый в отдельности, будет искать во всех поддиректориях
// если надо только 1 папка без поддерикторий
// let context = require.context('./routes/', false, /\.js$/); // 1 - имя нашей папки,2 - нам не нужны поддериктории потому false. 3 - параметром можно указать регулярное выражениеб что б по например по расширению отфильтровать нужные файлы
// let route = context('./' + moduleName); // автоматически подгружаем модули
// route();
//========

// let moduleName = location.pathname.slice(1);
// require('bundle!./routes/' + moduleName)(function(route) {
//
//     route();
//
// }); // не забываем установить npm i bundle-loader

// let moduleName = location.pathname.slice(1);
// let handler;
// try {
//     let context = require.context('bundle!./routes/', true, /^\.\//);
//     handler = context('./' + moduleName);
// } catch (e) {
//     alert('No such path');
// }
//
// if (handler) {
//     handler(function(route) {
//         route();
//     });
// }

// UglifyJSPlugin();

exports.serverData = serverData;
exports.template = template;
exports.google = google;
exports.bxslider = bxslider;
exports.myscript = myscript;

$('.accordion').on('click', '.accordion-panel, .accordion-plus', function(e) {
    require.ensure([], function(require) {
        let accordion = require('./no_routes/accordion');
        // exports.accordion = accordion;
        accordion(e);
    }, 'accord'); // если несколько эншуров будет иметь однинаковый 3 параметр, в данном случае 'accord'  то они объеденятся в 1 сборку с именем 'accord'
});
