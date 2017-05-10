module.exports = function myscript() {
    $(function () {
        'use strict';

        const template = require('./template');
        template();

        $('.bxslider').bxSlider();
    //Server start
        let $ServerData =
        {
        id: 100,
        data: [
                {
                id: 101,
                title: "Advanced Machinery Helps Improve Quality",
                month: 'Jan',
                day: 23,
                imageSrc: 'img/news1.jpg',
                author: 'cmsmasters',
                coments: 6,
                text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem."
                },
                {
                id: 102,
                title: "Powerful Techniques for Advanced Service",
                month: 'Jan',
                day: 21,
                imageSrc: 'img/news2.jpg',
                author: 'cmsmasters',
                coments: 3,
                text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem."
                }
            ]
        };
        let $Server = JSON.stringify($ServerData);
    //Server end
        let $jsData = JSON.parse($Server);
        let $html = $('#latestNews').html();
        let $dataTmpl = {
            $data: $jsData
        };
        let $content = template.tmpl($html, $dataTmpl);
        $('#latestNewsIn').html('');
        $('#latestNewsIn').append($content);
    //banner-box
        $('.accordion').on('click', '.accordion-panel, .accordion-plus', function(e) {
            let elem = $(e.target);
            Element();
            function Element() {
                if ( $('.panel').find('.accordion-panel-focus').length != 0 && (elem[0].className == 'accordion-panel' || elem[0].className == 'accordion-plus')) {
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
};
