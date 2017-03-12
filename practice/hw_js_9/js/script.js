'use strict';

$(document).ready(function() {
    var allPhoto = 10;
    var html_elem = '', k = "<li><img class='jcarousel_img'></li>";
    
    for (var i = 1; i <= allPhoto; i++) {
        $('.jcarousel').find('ul').html(k).find('img:last').attr({src: './img/'+i+'.jpg', width: '640', height: '480'});
        var last = $('ul:last').html();
        html_elem += last;
    };
    $('.jcarousel').find('ul').html(html_elem);


    $('.jcarousel').jcarousel({

    });
});
// .add('img').add({src: "'img/'+ ++i +'.jpg'", width: '600px', height: '400'})
// <img src="../_shared/img/img1.jpg" width="600" height="400" alt="">
