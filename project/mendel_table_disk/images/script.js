// Build by Zolotarenko Aleksey and Zolotarenko Ghenya
// 20180317
$(function () {
    'use strict';
    ~function () {
        var $window = $(window), $body = $("body");
        var ie = document.documentMode;

        function updateSizes() {
            var width = $window.width(), scale = Math.min(width / 2397, 1);
            var style = $body[0].style;

            style.msZoom = ie === 8 || ie === 9 ? scale : 1;
            style.zoom = ie === 10 || ie === 11 ? 1 : scale;
            style.mozTransform = "scale(" + scale + ")";
            style.oTransform = "scale(" + scale + ")";
            style.transform = 1;
        }

        $window.resize(updateSizes);
        updateSizes();
    }();
});
