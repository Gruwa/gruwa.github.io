'use strict';

const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const helpers               = require('./helpers');

// module.exports = {
//     config: {
//         test: /\.css$/,
//         exclude: helpers.root('src', 'app'),
//         loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
//       },
//     config2: 
//       {
//         test: /\.css$/,
//         include: helpers.root('src', 'app'),
//         loader: 'raw-loader'
//       }
// };

module.exports = {
    config: {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', 'resolve-url-loader', 'sass-loader' ]
        })
    },
    plugin: new ExtractTextPlugin('./style/style.css')
};
