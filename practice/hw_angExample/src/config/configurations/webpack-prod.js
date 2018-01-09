'use strict';

const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const pathToCore = './unity-core';

module.exports = {
  bail: true,
  output: {
    pathinfo: false // don't include comments with information about the modules into "prod" bundle
  },
  tslint: {
    emitErrors: true, // true to show warnings as errors
    formatter: 'checkstyle',
    fileOutput: {
      dir: './tslint-report/',
      ext: 'xml',
      clean: true // to remove old report on every new run
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    }),
    new webpack.DefinePlugin({
      AUTH: {}, // auth keys will be loaded from env's "cadreon.js" config
      ENVIRONMENT: '"production"'
    }),
    new AssetsPlugin({
      path: './dist/' + process.env.APP_DIST_DIR,
      filename: 'manifest.json',
      metadata: {
        build: process.env.BUILD_NUMBER,
        version: process.env.VERSION,
        core: new GitRevisionPlugin({gitWorkTree: pathToCore}).commithash().substring(0,7)
      }
    })
  ]
};
