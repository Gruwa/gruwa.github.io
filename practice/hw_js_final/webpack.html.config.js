'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const CopyWebpackPlugin     = require('copy-webpack-plugin');

module.exports = {
    config: {
        test: /\.html$/,
        use: [ {
                loader: 'html-loader',
                options: {
                minimize: true
            }
        }],
    },
    plugin: new CopyWebpackPlugin([{ from: './index.html', to: './' }])
};
