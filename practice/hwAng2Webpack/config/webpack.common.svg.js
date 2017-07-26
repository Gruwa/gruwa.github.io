'use strict';

const webpack    = require('webpack');
const path       = require('path');
// const ExtractTextPlugin     = require("extract-text-webpack-plugin");
// const SpritePlugin = require('svg-sprite-loader/plugin');
// const SvgSpritePlugin = require('webpack-svg-sprite-plugin');


module.exports = {
    config: {
      test: /\.svg$/,
      use: [
        'svg-sprite-loader',
        'svgo-loader'
      ]
    }
};