$(function () {
    'use strict';
    $('.bxslider').bxSlider();
//Server start
    var $ServerData =
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
    var $Server = JSON.stringify($ServerData);
//Server end

    var $jsData = JSON.parse($Server);
    var $html = $('#latestNews').html();
    var $dataTmpl = {
        $data: $jsData
    };
    var $content = tmpl($html, $dataTmpl);
    $('#latestNewsIn').html('');
    $('#latestNewsIn').append($content);
//news-box
    $('.panel').on('click', function(e) {
        var elem = $(e.target).parent();
        console.log(elem);
        console.log($('.panel').find('p.accordion-panel-focus'));
        if ($('.panel').find('p.accordion-panel-focus').length != 0) {
            $('.panel').find('.accordion-panel').removeClass('accordion-panel-focus');
            $('.panel').find('.accordion-plus').removeClass('accordion-plus-focus');
            $('.panel').removeClass('panel-focus');
        } else {
            $(e.target).find('.accordion-panel').addClass('accordion-panel-focus');
            $(e.target).find('.accordion-plus').addClass('accordion-plus-focus');
            $(e.target).addClass('panel-focus');
        }

        /* Act on the event */
    });
});
