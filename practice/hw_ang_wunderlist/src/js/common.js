let __svg__           = { path: '../img/svg/**/*.svg', name: 'img/sprite__icon.svg?[hash]' };

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

// let star = requ('./../img/svg/star.svg');
