var script =
webpackJsonp_name_([2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// import google from './google';
	// import bxslider from './bxslider';
	// import myscript from './myscript'; // запись на ES6
	// import template from './template';
	// const serverData = require('./server');// запись на ES5
	// // const myscript = require('./myscript'); // запись на ES5
	// // const UglifyJSPlugin = require('./UglifyJSPlugin');
	// google();
	// bxslider();
	// myscript();

	//======
	// let moduleName = location.pathname.slice(1);
	// let route = require("./routes/" + moduleName); // автоматическая подгрузка модулей с указанной директорииб вместо забитых руками выше каждый в отдельности, будет искать во всех поддиректориях
	// если надо только 1 папка без поддерикторий
	// let context = require.context('./routes/', false, /\.js$/); // 1 - имя нашей папки,2 - нам не нужны поддериктории потому false. 3 - параметром можно указать регулярное выражениеб что б по например по расширению отфильтровать нужные файлы
	// let route = context('./' + moduleName); // автоматически подгружаем модули
	// route();
	//========

	let moduleName = location.pathname.slice(1);
	__webpack_require__(7)("./" + moduleName)(function(route) {

	    route();

	}); // не забываем установить npm i bundle-loader

	// UglifyJSPlugin();

	exports.serverData = serverData;
	exports.template = template;
	exports.google = google;
	exports.bxslider = bxslider;
	exports.myscript = myscript;

	$('.accordion').on('click', '.accordion-panel, .accordion-plus', function(e) {
	    __webpack_require__.e/* nsure */(8, function(require) {
	        let accordion = __webpack_require__(13);
	        // exports.accordion = accordion;
	        accordion(e);
	    }); // если несколько эншуров будет иметь однинаковый 3 параметр, в данном случае 'accord'  то они объеденятся в 1 сборку с именем 'accord'
	});


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./bxslider": 8,
		"./bxslider.js": 8,
		"./google": 9,
		"./google.js": 9,
		"./myscript": 10,
		"./myscript.js": 10,
		"./server": 11,
		"./server.js": 11,
		"./template": 12,
		"./template.js": 12
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(3, function(require) {
		data = __webpack_require__(2);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(4, function(require) {
		data = __webpack_require__(3);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(5, function(require) {
		data = __webpack_require__(4);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(6, function(require) {
		data = __webpack_require__(5);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(7, function(require) {
		data = __webpack_require__(6);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ })
]);