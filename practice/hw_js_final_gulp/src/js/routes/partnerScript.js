module.exports = function partnerScript() {
    let serverData = require('./server')
    let template = require('./../library/template')
    let partnerHtml = require('./partnerHtml')

    $(function() {
        if (NODE_ENV === 'development') {
            debugger
        }

        let $jsData = JSON.parse(serverData);
        let $html = partnerHtml;
        let $dataTmpl = {
            $data: $jsData
        }
        let $content = template($html, $dataTmpl)

        $('#partners--template__in').html('')
        $('#partners--template__in').append($content)

    })
}
