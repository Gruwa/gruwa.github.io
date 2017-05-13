'use strict';

const NODE_ENV = require('./../webpack-config');

if (NODE_ENV == 'production') {

const UglifyJsPlugin = require('../../node_modules/webpack-uglify-js-plugin');

let config = {

    	module.exports.plugins.push(
    		new UglifyJsPlugin({
    			compress : {
    				warnings : false,
    				drop_console: true
    			}
    		})
    	);

};


    module.exports = config;
}
