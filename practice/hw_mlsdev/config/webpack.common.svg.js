'use strict';

const webpack               = require('webpack');
const path                  = require('path');




module.exports = {
    config:{
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          runtimeCompat: true
        }
      }
    // plugin: [
    //     new SpriteLoaderPlugin()
    //   ]
};