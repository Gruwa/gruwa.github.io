'use strict';
// const NODE_ENV = require('./project/js/webpack-config');
const webpack = require('webpack');
// const UglifyJsPlugin = require('./project/js/plugin/UglifyJsPlugin');
// const UglifyJsPlugin = require('./node_modules/webpack-uglify-js-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './project/js/script',
    output: {
        path: NODE_ENV == 'development' ? __dirname + "/build/js" : __dirname + '/production/js',
        filename: "build.js",
        library: 'script'
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout:100
    },
    // devtool: NODE_ENV == 'development' ? 'source-map' : null,
    plagins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG:     JSON.stringify('ru')
        })
    ],
    // module: {
    //     loaders: [{
    //         test: /\.jsx?$/,
    //         exclude: /(node_modules)/,
    //         loader: 'babel?optional[]=runtime'
    //     }]
    // },
    module: {
      loaders: [{
        test:   /\.js$/,
        loader: 'babel?optional[]=runtime'
      }]

    }
};

// if (NODE_ENV == 'production') {
// 	module.exports.plugins.push(
//         new webpack.optimize.UglifyJsPlugin({
//         sourceMap: false,
//         mangle: false
//      })
// 	);
// }
