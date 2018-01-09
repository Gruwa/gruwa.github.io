'use strict';

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

// load non-standard options via LoaderOptionsPlugin()
function setCustomPluginOptions(config) {
  const options = {};

  if (config.tslint) {
    options.tslint = _.cloneDeep(config.tslint);
    delete config.tslint;
  }
  if (config.postcss) {
    options.postcss = _.cloneDeep(config.postcss);
    delete config.postcss;
  }

  if (!_.isEmpty(options)) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({options}));
  }

  return config;
}

module.exports = (config) => {
  return setCustomPluginOptions(config);
};
