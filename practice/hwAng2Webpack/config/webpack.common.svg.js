'use strict';

const webpack    = require('webpack');
const path       = require('path');

module.exports = {
    config: {
      test: /\.svg$/,
      use: [
        'svg-sprite-loader',
        'svgo-loader'
      ]
    }
};
