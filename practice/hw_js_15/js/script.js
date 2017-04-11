$(function() {
    'use strict';

    window.ServerPhotoCallback = function($data) {
            console.log($data);
            var $html = $('#resultTenor').html();
            var $dataTmpl = {
                 $data: $data,
            };
            var $SearchContent = tmpl($html, $dataTmpl);
            $('#resultTenorIn').html('');
            $('#resultTenorIn').append($SearchContent);


    }

    $('form').submit(function(event) {
        /* Act on the event */
        event.preventDefault();
        var $value = $('#searchTenor').val();

        $.ajax({
            url: 'https://pixabay.com/api/',
            method: 'GET',
            dataType: 'jsonp',
            data: {
                key: '5069177-dbb9700ef5f333933be917c5e',
                q: $value,
                image_type: 'photo',
                callback: 'ServerPhotoCallback',
                per_page: '100'
            },


        });

    });


});




// }).done(function() {
//     console.log("success");
// }).fail(function() {
//     console.log("error");
// }).always(function() {
//     console.log($value);
//     console.log("complete");
