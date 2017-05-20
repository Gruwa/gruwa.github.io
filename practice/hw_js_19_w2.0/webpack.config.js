'use strict';

const NODE_ENV          = process.env.NODE_ENV || 'development';
const webpack           = require('webpack');
const path              = require('path');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = require('./config');


module.exports = {
    context: path.resolve(__dirname, config.root.proj), // директория в которой лежат js  указанные в entry

    entry: {
        script: "./js/script",
        scss: "./style/style.scss"
    },

    output: {
        path: NODE_ENV == 'development' ? __dirname + '/dev/js' : __dirname + '/production/js',
        publicPath: 'js/', //интернет путь к нашей сборке
        filename: '[name].js',
        library:  '[name]'
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
            // {
            //     test: /\.s[ac]ss$/,
            //     use: ExtractTextPlugin.extract({
            //             fallback: 'style-loader',
            //             use: [
            //                 { loader: 'css-loader', options: { importLoaders:  1, sourceMap: true } },
            //                 {
            //                     loader: "resolve-url-loader",
            //                 },
            //                 {
            //                   loader: "sass-loader",
            //                   options: {
            //                    sourceMap: true,
            //                     includePaths: [
            //                       path.resolve(__dirname, '/../style/style.css'),
            //                     ]
            //                   }
            //                 }
            //             ]
            //     })
            // },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'url-loader?limit=100000?',
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=100000?',
            }
        ]

    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, config.root.proj, config.js.proj),
            path.resolve(__dirname, config.root.proj, '/style'),
        ],
        extensions: [".js", ".json", ".jsx", ".css", '.scss', '.html'],
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
            new ExtractTextPlugin('/../style/style.css')
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

    devServer: {
        contentBase: path.join(__dirname, config.root.dev),
      compress: true,
      port: 9000
    }
};
