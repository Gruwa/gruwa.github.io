module.exports = function activityScript() {

    let template = require('./../library/template');
    let imagesloaded = require('./../library/imagesloaded.pkgd')
    let masonry = require('./../library/masonry.pkgd')
    let imagefill = require('./../library/jquery-imagefill')

    let $value = randWDclassic(1);

    let initialLoaded = false;

    function randWDclassic(n) {
        let s ='';
        let abd ='abcdefghijklmnopqrstuvwxyz1234567890йцукенгшщзхфывапролджэячсмитбю';
        let aL = abd.length;
        while(s.length < n)
        s += abd[Math.random() * aL|0];
        return s;
    };

    window.ServerPhotoCallback = function ($data) {
        // if (NODE_ENV === 'development') {
        //     debugger
        // }

        let $html = $('#activity--bar-out').html();
        let $dataTmpl = {
            $data: $data
        };
        let $SearchContent = $(template($html, $dataTmpl));

        // $('#activity--bar-in').html($SearchContent);

        insertImages($SearchContent);
    }

    function getPhotos(value) {
        $.ajax({
            url: 'https://pixabay.com/api/',
            method: 'GET',
            dataType: 'jsonp',
            data: {
                key: '5069177-dbb9700ef5f333933be917c5e',
                q: value,
                image_type: 'photo',
                callback: 'ServerPhotoCallback',
                per_page: 7,
                category: 'travel',
                min_width: 200
            }
        });
    }

    function insertImages($SearchContent) {
        let $grid = $('#activity--bar-in');

        $grid.hide();
        $grid.html($SearchContent);
        $grid.imagesLoaded( function() {
            // init Masonry after all images have loaded
            $grid.show();

            if (!initialLoaded) {
                initialLoaded = true;
                $grid.masonry({
                    itemSelector: '.grid-item',
                    itemWidth: 100
                });
            } else {
                $grid.masonry('prepended', $SearchContent);
            }
        });
    }

    $(function() {
        'use strict';

        // if (NODE_ENV === 'development') {
        //     debugger
        // }


        getPhotos($value);

        $('form').submit(function(event) {
            // if (NODE_ENV === 'development') {
            //             debugger
            // }
            event.preventDefault();
            $value = $('#activity--search').val();
            getPhotos($value);
            $('#activity--search').val('');
        });
    })
}
