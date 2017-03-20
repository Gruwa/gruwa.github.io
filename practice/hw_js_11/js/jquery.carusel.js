'use strict';

(function($, underfined){

    $.fn.carusel20170319 = function(options){

        var defaults = $.extend( {
            $quantityImg : '0',
            $widthImg : '50'

        }, options);

        function data() {
            $('.carousel-element').css({
                'display' : 'block',
                'margin-right' : '25px',
                'float' : 'left',
            });
            $('.carousel-list').css({
                'position' : 'relative',
                'list-style' : 'none',
                'width': '10000px',
                'padding': '0px,'
            });
            $('.carousel-hider').css({
                'width' : '600px',
                'overflow' : 'hidden',
                'float' : 'left',
            });
            $('.carousel-arrow-left, .carousel-arrow-right').css({
                'float' : 'left',
                'display' : 'block',
                'border' : '1px solid #3958E6',
                'background-color' : '#5483F1',
                'color' : '#fff',
                'border-radius' : '5px',
                'padding' : '5px',
                'margin-top' : '25px',
            });
            $('.carousel-arrow-left').css({
                'margin-right' : '25px',
            });
            $('.carousel-arrow-right').css({
                'margin-left' : '25px',
            });
        };

        photoGallary(defaults.$quantityImg, defaults.$widthImg);

        function photoGallary(key, widthImg) {
            var $html_elem = '', $k = '<li class="carousel-element"><img></li>';
            $('.carusel20170319').html('<div class="carousel-arrow-left"><span>Влево</span></div><div class="carousel-hider"></div><div class="carousel-arrow-right"><span>Вправо</span></div>');
            $('.carousel-hider').html('<ul class="carousel-list"></ul>');

            for (var i = 1; i <= key; i++) {
                $('.carusel20170319').find('ul').html($k).find('img:last').attr({src: './img/foto ('+i+').jpg', width : widthImg, class : 'imgGallery'});
                var $last = $('ul:last').html();
                $html_elem += $last;
            };
            $('.carusel20170319').find('ul').html($html_elem);
        };

        var leftUIEl = $('.carousel-arrow-left');
        var rightUIEl = $('.carousel-arrow-right');
        var elementsList = $('.carousel-list');
        var pixelsOffset = 125;
        var currentLeftValue = 0;

        leftUIEl.click(function() {
        });
       rightUIEl.click(function() {
        });


        data();
        return this;
    };
})(jQuery);
