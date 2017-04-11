$(function() {

    window.ServerPhotoCallback = function(jQueryObj, data) {
        console.log('data', data);
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
            },
            success: function() {
                console.log("success");
            },
            error: function() {
                console.log("error");
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
