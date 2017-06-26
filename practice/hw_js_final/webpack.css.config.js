'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const ProvidePlugin         = require('webpack').ProvidePlugin;

let config = require('./config');

module.exports = {

    context: path.resolve(__dirname, config.root.src),

    entry: {
        style: './style/style.scss'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'resolve-url-loader', 'sass-loader' ]
                })
            }
        ]
    },

    resolve: {
        modules: [
            path.join(__dirname, config.root.src, '/style')
        ],
        extensions: ['.css', '.scss']
    },

    plugins: (function() {
        let plugins = [];

        plugins.push(
            new ExtractTextPlugin('./style/style.css')
        );

        return plugins;
    }()),
};
