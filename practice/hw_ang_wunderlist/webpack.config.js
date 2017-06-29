'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const CleanWebpackPlugin    = require('clean-webpack-plugin');

let config = require('./config');
let {config: cssConfig, plugin: cssPlugin} = require('./webpack.css.config.js');
let {config: imgConfig, plugin: imgPlugin} = require('./webpack.img.config.js');
let {config: htmlConfig, plugin: htmlPlugin} = require('./webpack.html.config.js');
let {plugin: svgPlugin} = require('./webpack.svg.config.js');
let {config: fontConfig} = require('./webpack.font.config.js');

let rulesConfig = [
    {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules/"),
        loader: 'babel-loader',
        options: {
            presets: [['es2015', {modules: false}]]
        }
    }
];

rulesConfig.push(cssConfig);
rulesConfig.push(imgConfig);
rulesConfig.push(htmlConfig);
rulesConfig.push(fontConfig);

module.exports = {

    context: path.resolve(__dirname, config.root.src),

    entry: {
        script: ['./js/script', './index.html', './style/style.scss'],
        common: './js/common'
        // html: './index.html',
        // style: './style/style.scss'
    },

    output: {
        path: __dirname + '/build',
        publicPath: NODE_ENV == 'development' ? '/' : '/',
        filename: 'js/[name].js',
        // library:  'script'
    },

    module: {
        rules: rulesConfig
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, config.root.src, config.js.src),
            path.join(__dirname, config.root.src, '/style'),
            path.join(__dirname, config.root.src, '/'),
            path.join(__dirname, config.root.src, '/js/routes')
        ],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.html', '.svg']
    },

    devtool: NODE_ENV == 'development' ? 'eval' : 'source-map',

    watch: NODE_ENV == 'development',

    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000
    },

    externals: {
        lodash : {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_'
        },
        jquery : {
            commonjs: 'jQuery',
            amd: 'jQuery',
            root: '$'
        },

    },

    plugins: (function() {
        let plugins = [];

        plugins.push(
            new webpack.DefinePlugin({
              NODE_ENV: JSON.stringify(NODE_ENV)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            cssPlugin,
            imgPlugin,
            htmlPlugin,
            svgPlugin,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChanks: 2
            })
        );

        if (NODE_ENV != 'development') {
            plugins.push(
                new CleanWebpackPlugin(__dirname + '/build' ),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            );
        }

        return plugins;
    }()),

    devServer: {// webpack-dev-server --inline --hot
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/scr',
        hot: true,
        inline: true
    }
};
