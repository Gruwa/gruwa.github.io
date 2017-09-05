'use strict';

const webpack               = require('webpack');
const path                  = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const helpers               = require('./helpers');

module.exports = {
    config:  {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
    }
};