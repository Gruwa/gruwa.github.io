'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");

module.exports = {
    config: {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', 'resolve-url-loader', 'sass-loader' ]
        })
    },
    plugin: new ExtractTextPlugin('./style/style.css')
};
