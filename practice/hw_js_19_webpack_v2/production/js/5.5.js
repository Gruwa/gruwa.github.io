webpackJsonp_name_([5],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function myscript() {

	    $(function(){
	        let $jsData = JSON.parse(script.serverData);
	        let $html = $('#latestNews').html();
	        let $dataTmpl = {
	            $data: $jsData
	        };
	        let $content = script.template($html, $dataTmpl);

	        $('#latestNewsIn').html('');
	        $('#latestNewsIn').append($content);

	        script.bxslider($('.bxslider').bxSlider());

	        if (false) {
	            debugger
	        }
	    });
	};


/***/ })

});