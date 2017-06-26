'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const CopyWebpackPlugin     = require("copy-webpack-plugin");
const CleanWebpackPlugin    = require('clean-webpack-plugin');

let config = require('./config');

module.exports = {

    context: path.resolve(__dirname, config.root.src),

    entry: {
        script: './js/script',
        common: './js/common',
        html: './index.html',
        style: './style/style.scss'
    },

    output: {
        path: __dirname + '/build',
        publicPath: NODE_ENV == 'development' ? '/' : 'https://gruwa.github.io/practice/hw_js_final/build/',
        filename: 'js/[name].js',
        // library:  'script'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules/"),
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {modules: false}]]
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'resolve-url-loader', 'sass-loader' ]
                })
            },
            {
                test: /\.html$/,
                use: [ {
                        loader: 'html-loader',
                        options: {
                        minimize: true
                    }
                }],
            },
            {
              test: /\.svg$/,
              use: [
                'svg-sprite-loader',
                'svgo-loader'
              ]
            },
            {
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
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=font/[name].[ext]?[hash]'
            }
        ]
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, config.root.src, config.js.src),
            path.join(__dirname, config.root.src, '/style'),
            path.join(__dirname, config.root.src, '/'),
            path.join(__dirname, config.root.src, '/js/routes')
        ],
        extensions: [".js", ".json", ".jsx", ".css", '.scss', '.html', '.svg']
    },

    devtool: NODE_ENV == 'development' ? 'eval' : 'source-map',

    watch: NODE_ENV == 'development',

    watchOptions: {
      aggregateTimeout: 100,
      poll: 1000
    },

    externals: {
        lodash : {
            commonjs: "lodash",
            amd: "lodash",
            root: "_"
        },
        jquery : {
            commonjs: "jQuery",
            amd: "jQuery",
            root: "$"
        },

    },

    plugins: (function() {
        let plugins = [];

        plugins.push(
            new webpack.DefinePlugin({
              NODE_ENV: JSON.stringify(NODE_ENV)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new ExtractTextPlugin('./style/style.css'),
            new CopyWebpackPlugin([{ from: './img/server', to: './img' }]),
            new CopyWebpackPlugin([{ from: './index.html', to: './' }]),
            // new CleanWebpackPlugin(__dirname + '/build' ),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChanks: 2
            })
        );

        if (NODE_ENV != 'development') {
            plugins.push(
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
        contentBase: __dirname + '/build',
        hot: true
    }
};
