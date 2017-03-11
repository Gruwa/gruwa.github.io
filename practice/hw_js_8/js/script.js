'use strict';

$(document).ready(function() {
    $('.form').find('input').on('mouseenter', function() {
        var block = $(this);
        var data = $(this).data('text');

        if(data == 'firstname'){
            var key = 'Please provide your firstname.';
            hover(key);
        }if(data == 'lastname'){
            var key = 'Please provide your lastname.';
            hover(key);
        }if(data == 'address'){
            var key = 'Your home or work address.';
            hover(key);
        }else {};

        function hover(text) {
            var div = document.createElement('div');
            $(div).toggleClass('input_help');
            $(div).text(text);
            $(block).parent().append(div);
            console.log(block);
            $(div).animate({opacity: 'show', top: '-75'}, 'slow');
        }

    });
    $('.form').find('input').on('mouseleave', function(){
        // $('.input_help').remove();
    });
});
