module.exports = function partnerScript() {
    let serverData = require('./server')
    let template = require('./../library/template')
    let partnerHtml = require('./partnerHtml')

    let airplane = require('./../../img/svg/partners__airplane.svg')
    let cup = require('./../../img/svg/partners__cup.svg')
    let flask = require('./../../img/svg/partners__flask.svg')
    let tv = require('./../../img/svg/partners__tv.svg')

    $(function() {
        // if (NODE_ENV === 'development') {
        //     debugger
        // }

        let $jsData = JSON.parse(serverData);
        let $html = partnerHtml;
        let $dataTmpl = {
            $data: $jsData
        }
        let $content = template($html, $dataTmpl)

        $('#partners__template--in').html('')
        $('#partners__template--in').append($content)

    })
}
