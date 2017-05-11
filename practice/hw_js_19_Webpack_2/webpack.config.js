'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');

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
    plagins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
        }]
    }
};
if (NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress : {
				warnings : false,
				drop_console: true
			}
		})
	);
}
