'use strict';

const DefinePlugin = require('../../../node_modules/webpack/lib/DefinePlugin');

let config = {
  plugins: [
      new DefinePlugin({
          'process.env': {
              'NODE_ENV': JSON.stringify(NODE_ENV)
          }
      })
  ]
};

module.exports = config;
