'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');

module.exports = {
    config: {
      test: /\.svg$/,
      use: [
        'svg-sprite-loader',
        'svgo-loader'
      ]
    }
};
