var script =
webpackJsonp_name_([2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// Подключение всех нужный скрипт файлов

	var _interopRequireDefault = __webpack_require__(3)['default'];

	// в формате старом

	var _myscript = __webpack_require__(5);

	var _myscript2 = _interopRequireDefault(_myscript);

	// в формате ES2015
	var welcome3 = __webpack_require__(6).tmpl;var _ = __webpack_require__(7);
	var $ = __webpack_require__(8);

	// для доступа ко всем переменным в файлах
	exports.welcome = _myscript2['default'];
	exports.welcome3 = welcome3;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	$(function () {
	    'use strict';
	    $('.bxslider').bxSlider();
	    //Server start
	    var $ServerData = {
	        id: 100,
	        data: [{
	            id: 101,
	            title: "Advanced Machinery Helps Improve Quality",
	            month: 'Jan',
	            day: 23,
	            imageSrc: 'img/news1.jpg',
	            author: 'cmsmasters',
	            coments: 6,
	            text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem."
	        }, {
	            id: 102,
	            title: "Powerful Techniques for Advanced Service",
	            month: 'Jan',
	            day: 21,
	            imageSrc: 'img/news2.jpg',
	            author: 'cmsmasters',
	            coments: 3,
	            text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem."
	        }]
	    };
	    var $Server = JSON.stringify($ServerData);
	    //Server end
	    var $jsData = JSON.parse($Server);
	    var $html = $('#latestNews').html();
	    var $dataTmpl = {
	        $data: $jsData
	    };
	    //
	    //
	    debugger;
	    if (true) {
	        console.log($dataTmpl);
	    };
	    //
	    //
	    var $content = script.welcome3($html, $dataTmpl);
	    $('#latestNewsIn').html('');
	    $('#latestNewsIn').append($content);
	    //banner-box
	    $('.accordion').on('click', '.accordion-panel, .accordion-plus', function (e) {
	        var elem = $(e.target);
	        Element();
	        function Element() {
	            debugger;
	            if ($('.panel').find('.accordion-panel-focus').length != 0 && (elem[0].className == 'accordion-panel' || elem[0].className == 'accordion-plus')) {
	                $('.panel').find('.accordion-panel').removeClass('accordion-panel-focus');
	                $('.panel').find('.accordion-plus').removeClass('accordion-plus-focus');
	                $('.panel').find('.panel-focus').removeClass('panel-focus');
	                $('.panel').find('.accordion-text').css('display', 'none');
	                $(e.target).parent().find('.accordion-panel').addClass('accordion-panel-focus');
	                $(e.target).parent().find('.accordion-plus').addClass('accordion-plus-focus');
	                $(e.target).parent().addClass('panel-focus');
	                $(e.target).parent().parent().find('.accordion-text').fadeIn(700);
	                return;
	            };
	            if ($('.panel').find('.accordion-panel-focus').length == 0) {
	                $(e.target).parent().find('.accordion-panel').addClass('accordion-panel-focus');
	                $(e.target).parent().find('.accordion-plus').addClass('accordion-plus-focus');
	                $(e.target).parent().addClass('panel-focus');
	                $(e.target).parent().parent().find('.accordion-text').fadeIn(700);
	                return;
	            };
	            if ($('.panel').find('.accordion-panel-focus').length != 0) {
	                $('.panel').find('.accordion-panel').removeClass('accordion-panel-focus');
	                $('.panel').find('.accordion-plus').removeClass('accordion-plus-focus');
	                $('.panel').find('.panel-focus').removeClass('panel-focus');
	                $('.panel').find('.accordion-text').css('display', 'none');
	                return;
	            };
	        }
	    });
	});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// see:
	// http://ejohn.org/blog/javascript-micro-templating/

	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed

	"use strict";

	var cache = {};

	function tmpl(str, data) {
	  // Figure out if we're getting a template, or if we need to
	  // load the template - and be sure to cache the result.
	  var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :

	  // Generate a reusable function that will serve as a template
	  // generator (and which will be cached).
	  new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +

	  // Introduce the data as local variables using with(){}
	  "with(obj){p.push('" +

	  // Convert the template into pure JavaScript
	  str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");

	  // Provide some basic currying to the user
	  return data ? fn(data) : fn;
	};

	exports.tmpl = tmpl;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = _;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = $;

/***/ })
]);