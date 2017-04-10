$(function() {

    $('#submitTenor').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var $value = $('#searchTenor').value; 

        $.ajax({
            url: 'https://api.tenor.co/v1/gifs?key=LIVDSRZULELA&ids='+,
            type: 'default GET (Other values: POST)',
            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {param1: 'value1'}
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });


    });

});
