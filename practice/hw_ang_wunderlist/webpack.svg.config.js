'use strict';

const NODE_ENV              = process.env.NODE_ENV || 'development';
const webpack               = require('webpack');
const path                  = require('path');
const SvgStore              = require('webpack-svgstore-plugin');

module.exports = {
  plugin: new SvgStore({
      svgoOptions: {
          plugins: [
              { removeTitle: true }
          ]
      },
      prefix: 'icon_'
  })
};
