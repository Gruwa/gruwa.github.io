
'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const CopyWebpackPlugin     = require("copy-webpack-plugin");
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const SpriteLoaderPlugin    = require('svg-sprite-loader/plugin');

let config = require('./config');

module.exports = {

    context: path.resolve(__dirname, config.root.src),

    entry: {
        script: "./js/script",
        html: "./html/index.html",
        scss: "./style/style.scss"
    },

    output: {
        path: __dirname + '/dev/js',
        publicPath: 'js/',
        filename: '[name].js',
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
                test: /\.(html)$/,
                loader: 'file-loader?name=./../[name].[ext]'
            },
            // {
            //     test: /\.(svg)$/i,
            //     loader: 'svg-sprite-loader',
            //     include: [path.resolve(__dirname, 'img/svg/')],
            //     options: {
            //         runtimeCompat: true,
            //         spriteFilename: 'sprite--icons.svg'
            //     }
            //  },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loaders: [
                    'file-loader?name=./../img/[name].[ext]', {
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
                loader: 'file-loader?name=./../font/[name].[ext]'
            }
        ]
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, config.root.src, config.js.src),
            path.resolve(__dirname, config.root.src, '/style'),
            path.resolve(__dirname, config.root.src, '/html'),
            path.resolve(__dirname, config.root.src, '/js/routes')
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
        jQuery : {
            commonjs: "jquery",
            amd: "jquery",
            root: "$"
        }
    },

    plugins: (function() {
        let plugins = [];

        plugins.push(
            new webpack.DefinePlugin({
              NODE_ENV: JSON.stringify(NODE_ENV)
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new ExtractTextPlugin('../style.css'),
            new CopyWebpackPlugin([{ from: './img/server', to: '../img' }]),
            new CopyWebpackPlugin([{ from: './img/svg', to: '../img' }]),
            // new CopyWebpackPlugin([{ from: './html/html', to: '../' }]),
            // new SpriteLoaderPlugin(),
            new CleanWebpackPlugin(__dirname + '/dev' )
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
    }())
};
