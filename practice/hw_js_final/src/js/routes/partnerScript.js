module.exports = function partnerScript() {
    let serverData = require('./server')
    let template = require('./../library/template')
    let partnerHtml = require('./partnerHtml')

    let airplane = require('./../../img/svg/partners--airplane.svg')
    let cup = require('./../../img/svg/partners--cup.svg')
    let flask = require('./../../img/svg/partners--flask.svg')
    let tv = require('./../../img/svg/partners--tv.svg')

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
