'use strict';

const _ = require('lodash');

let webpackConfig = require('./configurations/webpack-generic');
const devConfig = require('./configurations/webpack-dev');
const prodConfig = require('./configurations/webpack-prod');

switch (process.env.NODE_ENV) {
  case 'dev':
    console.log('* Using "dev" environment config');
    webpackConfig = _.mergeWith(webpackConfig, devConfig, _concatArrays);
    break;

  case 'prod':
    console.log('* Using "prod" environment config');
    webpackConfig = _.mergeWith(webpackConfig, prodConfig, _concatArrays);
    break;

  default:
    console.log('No environment defined --> quit with failure');
    process.exit(1);
}

function _concatArrays(a, b) {
  return _.isArray(a) ? a.concat(b) : undefined;
}

module.exports = webpackConfig;
