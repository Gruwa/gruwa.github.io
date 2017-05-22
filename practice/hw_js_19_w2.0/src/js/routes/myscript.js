module.exports = function myscript() {
    let serverData = require('./server');
    let template = require('./template');
    let bxslider = require('./bxslider');

    bxslider();

    $(function(){
        let $jsData = JSON.parse(serverData);
        let $html = $('#latestNews').html();
        let $dataTmpl = {
            $data: $jsData
        };
        let $content = template($html, $dataTmpl);

        $('#latestNewsIn').html('');
        $('#latestNewsIn').append($content);

        if (NODE_ENV === 'development') {
            debugger
        }

        bxslider($('.bxslider').bxSlider());
    });
};
