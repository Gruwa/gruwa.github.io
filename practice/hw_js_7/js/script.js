'use striсt';

$(document).ready(function(){
    $('button').on('click', function() {
        var name = document.activeElement.id;
        var name_text ='.'+name+'_text';
        $(this).parent().find('.button_focus').removeClass('button_focus');
        $(this).addClass('button_focus');
        $(this).parent().parent().find('p').css({'display': 'none'});
        $(this).parent().parent().find(name_text).css({'display': 'inline'});
    });
});
