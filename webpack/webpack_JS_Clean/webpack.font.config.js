'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');

module.exports = {
    config:     {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader?name=font/[name].[ext]?[hash]'
        }
};
