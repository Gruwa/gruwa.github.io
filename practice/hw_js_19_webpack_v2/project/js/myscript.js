module.exports = function myscript() {

    $(function(){

        const serverData = require('./server');// запись на ES5


        exports.serverData = serverData;

        let $jsData = JSON.parse(serverData);
        let $html = $('#latestNews').html();
        let $dataTmpl = {
            $data: $jsData
        };
        let $content = script.template($html, $dataTmpl);

        $('#latestNewsIn').html('');
        $('#latestNewsIn').append($content);

        script.bxslider($('.bxslider').bxSlider());

        if (NODE_ENV === 'development') {
            debugger
        }
    });
};
