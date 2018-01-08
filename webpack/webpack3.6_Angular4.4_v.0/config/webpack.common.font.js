'use strict';

const webpack    = require('webpack');
const path       = require('path');

module.exports = {
    config:     {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/font/[name].[ext]?[hash:6]'
      }
};
