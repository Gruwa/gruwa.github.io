var script =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// import google from './google';
	// import bxslider from './bxslider';
	// import myscript from './myscript'; // запись на ES6
	var myscript = __webpack_require__(1); // запись на ES5
	// import accordion from './accordion';
	// import template from './template';

	// const NODE_ENV = require('./webpack-config');

	// google();
	// bxslider();
	myscript();
	// accordion();

	// exports.template = template;
	// exports.google = google;
	// exports.bxslider = bxslider;
	exports.myscript = myscript;
	// exports.accordion = accordion;
	// exports.NODE_ENV = NODE_ENV;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function myscript() {

	        $(function () {

	                // const serverData = require('./server');// запись на ES5
	                // const NODE_ENV = require('./webpack-config');

	                // exports.serverData = serverData;

	                var $jsData = JSON.parse(serverData);
	                var $html = $('#latestNews').html();
	                var $dataTmpl = {
	                        $data: $jsData
	                };
	                // let $content = script.template($html, $dataTmpl);

	                $('#latestNewsIn').html('');
	                // $('#latestNewsIn').append($content);

	                // script.bxslider($('.bxslider').bxSlider());

	                if (true) {
	                        debugger;
	                }
	        });
	};

/***/ })
/******/ ]);