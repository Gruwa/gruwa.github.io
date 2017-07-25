'use strict';

const webpack    = require('webpack');
const path       = require('path');

module.exports = {
    config:     {
        test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/font/[name].[hash:6].[ext]'
      }
};
