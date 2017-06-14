const path = require('path');
const merge = require('deepmerge');
const baseConfig = require('../webpack.config');

module.exports = merge(baseConfig, {
  context: path.resolve(__dirname+ 'src/img/svg'),

  entry: './main',

  output: {
    path: __dirname + 'dev/img'
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      }
    ]
  }
});
