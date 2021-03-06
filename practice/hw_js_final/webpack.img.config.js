'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const CopyWebpackPlugin     = require('copy-webpack-plugin');

module.exports = {
    config: {
        test: /\.(png|jpg|gif)$/,
        loaders: [
            'file-loader?name=img/[name].[ext]?[hash]', {
                loader: 'image-webpack-loader',
                query: {
                    mozjpeg: {
                      progressive: true,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    optipng: {
                      optimizationLevel: 4,
                    },
                    pngquant: {
                      quality: '70-90',
                      speed: 3,
                    },
                 },
        }],
        exclude: /node_modules/,
        include: __dirname,
    },
    plugin: new CopyWebpackPlugin([{ from: './img/server', to: './img' }])
};
