'use strict';

(function($, underfind){
    $('div.carusel20170319').carusel20170319({
        $quantityImg: '10',
        $widthImg : '100'
    });
    //  start John Resig
    var $html = $('#homework1').html();
    var $data = {
        name : 'Золотаренко Алексей Дмитриевич',
        img : 'wooo.png',
        text : 'Мы все учились',
        title2 : 'Хочу учить фронтенд, потому что:',
        title3 : 'Мой контактный телефон:',
        content_4 : '+38022222222222',
        title4 : 'Мой профиль Вконтакте:',
        content_5_link : 'https://vk.com/',
        content_5_name : 'vk.com',
        title5 : 'Мой фидбек:',
        content_6 : 'Если нужно, могу построить вам нечто',
        menu_list1 : 'Заборы строить не интересно',
        menu_list2 : 'Платят мало',
        menu_list3 :  'Приходится работать по ночам',
    };
    var $content = tmpl($html, $data);
    $('.wrapper').append($content);
    //end  John Resig


})(jQuery);
