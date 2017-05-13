module.exports = function accordion () {
    'use strict';
    const NODE_ENV = require('./webpack-config');
// start my accordion
    $('.accordion').on('click', '.accordion-panel, .accordion-plus', function(e) {
        let elem = $(e.target);
        let panel = $('.panel');
        let elemParent = elem.parent();

        if (NODE_ENV === 'development') {
            debugger
        }
        if ( panel.find('.accordion-panel-focus').length != 0 && (elem[0].className == 'accordion-panel' || elem[0].className == 'accordion-plus')) {
            panel.find('.accordion-panel').removeClass('accordion-panel-focus');
            panel.find('.accordion-plus').removeClass('accordion-plus-focus');
            panel.find('.panel-focus').removeClass('panel-focus');
            panel.find('.accordion-text').css('display', 'none');
            elemParent.find('.accordion-panel').addClass('accordion-panel-focus');
            elemParent.find('.accordion-plus').addClass('accordion-plus-focus');
            elemParent.addClass('panel-focus');
            elemParent.parent().find('.accordion-text').fadeIn(700);
            return;
        };
        if (panel.find('.accordion-panel-focus').length == 0) {
            elemParent.find('.accordion-panel').addClass('accordion-panel-focus');
            elemParent.find('.accordion-plus').addClass('accordion-plus-focus');
            elemParent.addClass('panel-focus');
            elemParent.parent().find('.accordion-text').fadeIn(700);
            return;
        };
        if (panel.find('.accordion-panel-focus').length != 0) {
            panel.find('.accordion-panel').removeClass('accordion-panel-focus');
            panel.find('.accordion-plus').removeClass('accordion-plus-focus');
            panel.find('.panel-focus').removeClass('panel-focus');
            panel.find('.accordion-text').css('display', 'none');
            return;
        };

    });
// end my accordion
};
