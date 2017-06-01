/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"./../index.html\";\n\n//////////////////\n// WEBPACK FOOTER\n// ./html/index.html\n// module id = 0\n// module chunks = 0 1\n\n//# sourceURL=webpack:///./html/index.html?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = function myscript() {\n    var serverData = __webpack_require__(2);\n    var template = __webpack_require__(3);\n    var templateScript = __webpack_require__(4);\n\n    // let bxslider = require('./bxslider');\n\n    // bxslider();\n\n    $(function () {\n        if (true) {\n            debugger;\n        }\n\n        var $jsData = JSON.parse(serverData);\n        var $html = templateScript;\n        var $dataTmpl = {\n            $data: $jsData\n        };\n        var $content = template($html, $dataTmpl);\n\n        $('#partners--template__in').html('');\n        $('#partners--template__in').append($content);\n\n        // bxslider($('.bxslider').bxSlider());\n    });\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./js/routes/myscript.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./js/routes/myscript.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n//Server start\n\nvar $ServerData = {\n    id: 100,\n    data: [{\n        id: 104,\n        name: \"Bradley\",\n        surname: \"Hunter\",\n        photo: 'img/partners--hunter__mobile.png',\n        info: \"Based in Chicago. I love playing tennis and loud music.\",\n        colorIcon: '4e73db',\n        icon: 'img/partners--airplane.svg'\n    }, {\n        id: 102,\n        name: \"Lucas\",\n        surname: \"Marsha\",\n        photo: 'img/partners--marsha__mobile.png',\n        info: \"I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.\",\n        colorIcon: 'ffa507',\n        icon: 'img/partners--flask.svg'\n    }, {\n        id: 103,\n        name: \"Heather\",\n        surname: \"Walker\",\n        photo: 'img/partners--walker__mobile.png',\n        info: \"I'm a happy person that loves cats and climbing on mountains.\",\n        colorIcon: '1cd7ad',\n        icon: 'img/partners--cup.svg'\n    }, {\n        id: 101,\n        name: \"Gogas\",\n        surname: \"Hunter\",\n        photo: 'img/partners--hunter2__mobile.png',\n        info: \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\n        colorIcon: 'ff4e50',\n        icon: 'img/partners--tv.svg'\n    }]\n};\nvar $server = JSON.stringify($ServerData);\n//Server end\n\nmodule.exports = $server;\n\n//////////////////\n// WEBPACK FOOTER\n// ./js/routes/server.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./js/routes/server.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// see:\n// http://ejohn.org/blog/javascript-micro-templating/\n\n// Simple JavaScript Templating\n// John Resig - http://ejohn.org/ - MIT Licensed\n\nvar cache = {};\n\nfunction tmpl(str, data) {\n    // Figure out if we're getting a template, or if we need to\n    // load the template - and be sure to cache the result.\n    var fn = !/\\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :\n\n    // Generate a reusable function that will serve as a template\n    // generator (and which will be cached).\n    new Function(\"obj\", \"var p=[],print=function(){p.push.apply(p,arguments);};\" +\n\n    // Introduce the data as local variables using with(){}\n    \"with(obj){p.push('\" +\n\n    // Convert the template into pure JavaScript\n    str.replace(/[\\r\\t\\n]/g, \" \").split(\"<%\").join(\"\\t\").replace(/((^|%>)[^\\t]*)'/g, \"$1\\r\").replace(/\\t=(.*?)%>/g, \"',$1,'\").split(\"\\t\").join(\"');\").split(\"%>\").join(\"p.push('\").split(\"\\r\").join(\"\\\\'\") + \"');}return p.join('');\");\n\n    // Provide some basic currying to the user\n    return data ? fn(data) : fn;\n};\n\nmodule.exports = tmpl;\n\n//////////////////\n// WEBPACK FOOTER\n// ./js/routes/template.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///./js/routes/template.js?");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

eval("var $templateScript = '<%' + 'var $array = $data.data;' + 'for (let i = 0; i < $array.length; i++) {%>' + '<div class=\"partners--template\">' + '<div class=\"partners--photo\" style=\"background-image:url(<%=$array[i].photo%>)\">' + '<div class=\"partners--embl\" style=\"background-image:url(<%=$array[i].icon%>);background-color:#<%=$array[i].colorIcon%>\"></div>' + '</div>' + '<p class=\"partners--name\"><%=$array[i].name%> <%=$array[i].surname%></p>' + '<p class=\"partners--text\"><%=$array[i].info%></p>' + '</div>' + '<%}%>';\n\nmodule.exports = $templateScript;\n\n//////////////////\n// WEBPACK FOOTER\n// ./js/routes/templateScript.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./js/routes/templateScript.js?");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes_myscript__ = __webpack_require__(1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes_myscript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__routes_myscript__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_index_html__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_index_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__html_index_html__);\n\n\n\n\n\n// import accordion from './no_routes/accordion'\n//\n\n__WEBPACK_IMPORTED_MODULE_0__routes_myscript___default()();\n// accordion();\n\n\n// $('.accordion').on('click', '.accordion-panel, .accordion-plus', function(e) {\n//     require.ensure([], function(require) {\n//         let accordion = require('./no_routes/accordion');\n//         // exports.accordion = accordion;\n//         accordion(e);\n//     }, 'accord'); // если несколько эншуров будет иметь однинаковый 3 параметр, в данном случае 'accord'  то они объеденятся в 1 сборку с именем 'accord'\n// });\n\n\n// let scss = require('./../style/syle')\n\n// import '../style/syle';\n\n//======\n// let moduleName = location.pathname.slice(1);\n// let route = require(\"./routes/\" + moduleName); // автоматическая подгрузка модулей с указанной директорииб вместо забитых руками выше каждый в отдельности, будет искать во всех поддиректориях\n// если надо только 1 папка без поддерикторий\n// let context = require.context('./routes/', false, /\\.js$/); // 1 - имя нашей папки,2 - нам не нужны поддериктории потому false. 3 - параметром можно указать регулярное выражениеб что б по например по расширению отфильтровать нужные файлы\n// let route = context('./' + moduleName); // автоматически подгружаем модули\n// route();\n//========\n\n// let moduleName = location.pathname.slice(1);\n// require('bundle!./routes/' + moduleName)(function(route) {\n//\n//     route();\n//\n// }); // не забываем установить npm i bundle-loader\n\n// let moduleName = location.pathname.slice(1);\n// let handler;\n// try {\n//     let context = require.context('bundle!./routes/', true, /^\\.\\//);\n//     handler = context('./' + moduleName);\n// } catch (e) {\n//     alert('No such path');\n// }\n//\n// if (handler) {\n//     handler(function(route) {\n//         route();\n//     });\n// }\n\n// UglifyJSPlugin();\n\n//////////////////\n// WEBPACK FOOTER\n// ./js/script.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ })
/******/ ]);