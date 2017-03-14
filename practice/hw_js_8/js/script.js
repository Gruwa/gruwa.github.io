'use strict';

(function($, undefined) {
    var $div;

    $('.form').find('input').hover(function() {
        click ($(this));
    }, function(){
        $($div).animate({opacity: 'hide', top: '60px'}, 'fast');
        $(this).parent().find('.input_help').remove();
    });
    $('.show_help').on('click', function() {
        var $array = $('.form').find('input');

        for (var i = 0; i < $array.length; i++) {
            var element = $array[i];
            click (element);
        }

    });

    function click (key) {
        var $hoverText = $(key).attr("name");

        $div = document.createElement('div');
        $($div).addClass('input_help');
        $(key).parent().append($div);
        $($div).text($hoverText);
        $($div).animate({opacity: 'show', top: '23px'});
    };
})(jQuery);
