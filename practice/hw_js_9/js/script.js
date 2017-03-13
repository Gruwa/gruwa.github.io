'use strict';

$(document).ready(function() {
    // start jcarousel
    $(function() {
        var allPhoto = 10;

        photoGallary(allPhoto);

        function photoGallary(key) {
            var html_elem = '', k = "<li><img class='jcarousel_img'></li>";

            for (var i = 1; i <= key; i++) {
                $('.jcarousel').find('ul').html(k).find('img:last').attr({src: './img/'+i+'.jpg', width: '640', height: '480'});
                var last = $('ul:last').html();
                html_elem += last;
            };
            $('.jcarousel').find('ul').html(html_elem);
        }

        $('.jcarousel').jcarousel();

        $('.jcarousel')
            .jcarousel('reload', {
                animation: 400
            })
            .jcarousel({
                wrap: 'both'
            });

        $('.jcarousel-prev').click(function() {
            $('.jcarousel').jcarousel('scroll', '-=1');
        });

        $('.jcarousel-next').click(function() {
            $('.jcarousel').jcarousel('scroll', '+=1');
        });

    });
    // end jcarousel

});
