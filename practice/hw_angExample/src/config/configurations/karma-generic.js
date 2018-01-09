'use strict';

// by default this is "dev" env config
module.exports = {
  webpack: require('./webpack-unit-tests'),
  webpackMiddleware: {stats: {normal: true, colors: true}},
  frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],

  // "coverage" reporter generates coverage for raw JS files produced by ts compiler
  // "karma-remap-coverage" reporter remaps raw coverage to original TS code using inline source maps
  reporters: ['dots', 'coverage', 'remap-coverage'],

  coverageReporter: {
    type: 'in-memory' // save interim report in memory
  },

  remapCoverageReporter: {
    'text-summary': null, // to show brief coverage report in console
    html: './coverage/html'
  },

  // Chrome 54 and higher refuses to load .ts files as it doesn't know mime type
  mime: {
    'text/x-typescript': ['ts','tsx']
  },

  plugins: [
    require('karma-allure-reporter'),
    require('karma-chai'),
    require('karma-remap-coverage'),
    require('karma-coverage'),
    require('karma-junit-reporter'),
    require('karma-mocha'),
    require('karma-mocha-reporter'),
    require('karma-chrome-launcher'),
    require('karma-sinon'),
    require('karma-sinon-chai'),
    require('karma-sourcemap-loader'),
    require('karma-webpack')
  ],
  browsers: ['ChromeHeadless'],
  port: 9876,
  colors: true,
  autoWatch: true,
  singleRun: false
};
