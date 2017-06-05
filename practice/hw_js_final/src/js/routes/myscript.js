module.exports = function myscript() {
    let serverData = require('./server')
    let template = require('./template')
    let templateScript = require('./templateScript')

    $(function() {
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
