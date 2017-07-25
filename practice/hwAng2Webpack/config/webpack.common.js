'use strict';

const webpack               = require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const helpers               = require('./helpers');
const CopyWebpackPlugin     = require('copy-webpack-plugin');

let {config: cssConfig}     = require('./webpack.common.css');
let {config: scssConfig}    = require('./webpack.common.scss');
let {config: imgConfig}     = require('./webpack.common.img');
let {config: tsConfig}      = require('./webpack.common.ts');
let {config: svgConfig}     = require('./webpack.common.svg');
let {config: fontConfig}    = require('./webpack.common.font');

let rulesConfig = [
    {
        test: /\.html$/,
        loader: 'html-loader'
    }
    // {
    //     test: /\.(png|jpe?g|gif)$/,
    //     loader: [
    //         'file-loader?name=assets/img/[name].[hash:6].[ext]?limit=100000', {
    //             loader: 'image-webpack-loader',
    //             query: {
    //                 mozjpeg: {
    //                   progressive: true,
    //                 },
    //                 gifsicle: {
    //                   interlaced: false,
    //                 },
    //                 optipng: {
    //                   optimizationLevel: 4,
    //                 },
    //                 pngquant: {
    //                   quality: '70-90',
    //                   speed: 3,
    //                 },
    //              },
    //     }],
    //     exclude: /node_modules/,
    //     include: __dirname,
    // }
];

rulesConfig.push(cssConfig);
rulesConfig.push(scssConfig);
rulesConfig.push(imgConfig);
rulesConfig.push(tsConfig);
rulesConfig.push(svgConfig);
rulesConfig.push(fontConfig);

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.css', '.scss', '.html', '.svg']
  },

  module: {
        rules: rulesConfig
    },

    plugins: (function() {

        let plugins = [];

        plugins.push(
            // Workaround for angular/angular#11580
            new webpack.ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)@angular/,
                helpers.root('./src'), // location of your src
                {} // a map of your routes
            ),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
            // new CopyWebpackPlugin([{ from: 'assets/img/server', to: 'assets/img' }])
        );

        return plugins;
        
    }()),
};