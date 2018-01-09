'use strict';

const webpack   = require('webpack');
const path      = require('path');
var helpers     = require('./helpers');

module.exports = {
    config: {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src/..', 'tsconfig.json') }
          },
          'angular2-template-loader',
          'angular-router-loader'
        ]
      }
};
