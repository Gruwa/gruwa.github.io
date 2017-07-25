'use strict';

const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const helpers               = require('./helpers');

module.exports = {
    config: {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ 
            fallback: 'style-loader', 
            use: [ 'css-loader?sourceMap', 'postcss-loader', 'sass-loader' ] 
        })
    }
};