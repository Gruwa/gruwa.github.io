'use strict';

const webpack   = require('webpack');
const path      = require('path');

module.exports = {
    config: {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: [
        {
            loader: 'file-loader',
            options: {
            name: 'assets/img/[name].[ext]?[hash:6]'
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
            mozjpeg: {
                quality: 65
            },
            pngquant:{
                quality: "50-70",
                speed: 4
            },
            svgo:{
                plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
                ]
            },
            gifsicle: {
                optimizationLevel: 6,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 6,
                interlaced: false
            }
            }
          }
        ]
    }
};
