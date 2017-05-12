'use strict';
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');
const DefinePlugin = require('./node_modules/webpack/lib/DefinePlugin');

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
    devtool: NODE_ENV == 'development' ? 'source-map' : null,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel?optional[]=runtime'
        }]
    },
    plagins: [
        new DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
        // new webpack.EnvironmentPlugin({
        //     NODE_ENV: 'development'
        // })
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify(NODE_ENV)
        //     }
        // })
        // new webpack.EnvironmentPlugin('NODE_ENV', 'USER')
    ]
};

if (NODE_ENV == 'production') {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress : {
				warnings : false,
				drop_console: true
			}
		})
	);
}
