$(function() {

    $('form').submit(function(event) {
        /* Act on the event */
        var $value = $('#searchTenor').val();


        $.ajax({
            url: 'https://pixabay.com/api/',
            method: 'GET',
            // dataType: 'jsonp',
            data: {
                key: '5069177-dbb9700ef5f333933be917c5e',
                q: $value,
                image_type: 'photo',



            }
        }).done(function() {
            console.log("success");
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log($value);
            // console.log($.ajax);
            console.log("complete");
        });

    });

});
