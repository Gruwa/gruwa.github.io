'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry:  "./project/js/script",
    output: {
        path: NODE_ENV == 'development' ? __dirname + "/build/js" : __dirname + '/production/js',
        filename: 'build.js',
        library:  'script'
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
      aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? 'source-map' : null,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences:      true,
            booleans:       true,
            loops:          true,
            unused:         true,
            warnings:       false,
            drop_console:   true,
            unsafe:         true
        }
    })
  ],
  module: {
      loaders: [{
      test:   /\.js$/,
      loader: 'babel?optional[]=runtime'
    }]

  }

};


// if (NODE_ENV == 'production') {
//   module.exports.plugins.push(
//       new webpack.NoErrorsPlugin(),
//       new webpack.optimize.UglifyJsPlugin({
//           beautify: false,
//           comments: false,
//           compress: {
//               sequences:      true,
//               booleans:       true,
//               loops:          true,
//               unused:         true,
//               warnings:       false,
//               drop_console:   true,
//               unsafe:         true
//           }
//       })
//   );
// }
