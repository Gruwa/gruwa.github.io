'use strict';

const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const helpers               = require('./helpers');

const extractSass = new ExtractTextPlugin({ 
    filename: 'assets/style/style.css?[hash:6]', allChunks: true });

module.exports = {
    config: {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
    },
    plugin: extractSass
};