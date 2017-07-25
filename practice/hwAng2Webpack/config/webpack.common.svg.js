'use strict';

const webpack    = require('webpack');
const path       = require('path');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const SpritePlugin = require('svg-sprite-loader/plugin');


module.exports = {
    config: {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: 'assets/img/sprite.[hash:6].svg'
        }
    },
    plagin: new SpritePlugin()
};

// let airplane = require('../src/assets/img/svg/partners__airplane.svg');