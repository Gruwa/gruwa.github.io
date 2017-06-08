module.exports = function myscript() {
    let serverData = require('./server')
    let template = require('./template')
    let templateScript = require('./templateScript')
    let bxslider = require('./bxslider')
    let masonry = require('./masonry.pkgd')
    let imagesloaded = require('./imagesloaded.pkgd')
    let imagefill = require('./jquery-imagefill')

    bxslider()

    $(function() {
        if (NODE_ENV === 'development') {
            debugger
        }

        let $jsData = JSON.parse(serverData);
        let $html = templateScript;
        let $dataTmpl = {
            $data: $jsData
        }
        let $content = template($html, $dataTmpl)

        $('#partners--template__in').html('')
        $('#partners--template__in').append($content)

        bxslider($('.bxslider').bxSlider())

        // $('.grid').masonry({
        //     itemSelector: '.grid-item',
        //     columnWidth: 200
        // })
        let $grid = $('.grid').imagesLoaded( function() {
  // init Masonry after all images have loaded
            $grid.masonry({
              itemSelector: '.grid-item',
              columnWidth: 200
                })
        })
    });


};
