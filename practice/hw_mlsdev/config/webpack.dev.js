const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('src', 'tsconfig.json') }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ]
            }
        ]
    },

    devServer:  (function() {

        let devServer = {};

        devServer.historyApiFallback = true;
        devServer.stats = 'minimal';
        devServer.port = '8081';
        devServer.inline = true;
        devServer.progress = true;
        devServer.contentBase = './src';
        devServer.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        };
        devServer.compress = true;
        devServer.quiet = false;
        devServer.overlay = {errors: true};
        devServer.watchOptions = {
            aggregateTimeout: 50,
            ignored: /node_modules/
        };

        return devServer;

    }())
});