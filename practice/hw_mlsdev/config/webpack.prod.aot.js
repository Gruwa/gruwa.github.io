const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {

    devtool: 'source-map',

    entry: {
        'app': './src/main-aot.ts'
    },

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{loader: '@ngtools/webpack'}],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            }
        ]
    },

    plugins: [
        new AotPlugin({
            tsConfigPath: './src/tsconfig.json',
            entryModule: helpers.root('./src/app/app.module.ts#AppModule')
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        //     compress: {
        //         warnings: false,
        //         screw_ie8: true,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true
        //     },
        //     mangle: {
        //         keep_fnames: true
        //     },
        //     output: {
        //         comments: false
        //     },
        //     sourceMap: true
        // }),
        new webpack.DefinePlugin({
            'process.env': {
            'ENV': JSON.stringify(ENV)
            }
        })
    ]
});