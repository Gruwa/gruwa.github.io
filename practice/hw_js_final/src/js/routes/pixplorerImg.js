module.exports = function myscript() {
    let template = require('./template')
    let templateScript = require('./templateScript')

    $(function() {
        'use strict';
        if (NODE_ENV === 'development') {
            debugger
        }

        let $jsData = JSON.parse(serverData);
        let $html = templateScript;
        let $dataTmpl = {
            $data: $jsData
        };
        let $content = template($html, $dataTmpl);

        $('#partners--template__in').html('');
        $('#partners--template__in').append($content);

    });
};


    window.ServerPhotoCallback = function ($data) {
        let $html = $('#resultTenor').html()
        // let $html = templateScript
        let $dataTmpl = {
            $data: $data
        }
        let $SearchContent = tmpl($html, $dataTmpl)

        $('#resultTenorIn').html('')
        $('#resultTenorIn').append($SearchContent)
    }

    $('#activity--form').submit(function(event) {
        event.preventDefault();
        var $value = $('#activity--search').val();
        $.ajax({
            url: 'https://api.pixplorer.co.uk/image',
            method: 'GET',
            dataType: 'jsonp',
            data: {
                word: $value,
                amount: 7,
                size: 'tb'
            }
        });
    });
