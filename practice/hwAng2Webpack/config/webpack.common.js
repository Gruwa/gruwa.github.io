'use strict';

const webpack               = require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const helpers               = require('./helpers');

let {config: cssConfig, plugin: cssPlugin}      = require('./webpack.common.css');
let {config: imgConfig}                         = require('./webpack.common.img');
let {config: tsConfig}                          = require('./webpack.common.ts');
let {config: svgConfig}                         = require('./webpack.common.svg');
let {config: fontConfig}                        = require('./webpack.common.font');

let rulesConfig = [
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ];

rulesConfig.push(cssConfig);
// rulesConfig.push(cssConfig2);
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
            }),
            cssPlugin
        );

        return plugins;
        
    }()),
};