'use strict';

// const webpack = require('webpack');
// new webpack.EnvironmentPlugin("NODE_ENV");
// const NODE_ENV = process.env.NODE_ENV || 'development';
//
// module.exports = {
//     // entry:  NODE_ENV == 'development' ? __dirname + "/../../build/js/build" : __dirname + '/../../production/js/build',
//     // output: {
//     //     path: NODE_ENV == 'development' ? __dirname + "/../../build/js" : __dirname + '/../../production/js',
//     //     filename: 'build.js'
//     // },
//     devtool: NODE_ENV == 'development' ? 'source-map' : null,
//     //     plugins: [
//     //     new webpack.NoErrorsPlugin(),
//     //     new webpack.optimize.UglifyJsPlugin({
//     //         beautify: false,
//     //         comments: false,
//     //         compress: {
//     //             sequences:      true,
//     //             booleans:       true,
//     //             loops:          true,
//     //             unused:         true,
//     //             warnings:       false,
//     //             drop_console:   true,
//     //             unsafe:         true
//     //         }
//     //     })
//     //
//     // ]
// };

// version 2

// !!!---- Хрень и как с ней бороться
// ERROR in ./~/uglify-js/tools/node.js
// Module not found: Error: Cannot resolve module 'fs' in C:\Users\Al\work_git\gruwa.github.io\practice\hw_js_19_webpack_v2\node_modules\uglify-js\tools
//  @ ./~/uglify-js/tools/node.js 9:9-22
// это не помогает:
// target: 'node',
// node: {
//     fs: "empty"
// },


// const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //1 plugin or
// const UglifyJsPlugin = require('webpack-uglify-js-plugin'); //2 plugin
//
// let config = {
//     entry:  NODE_ENV == 'development' ? "/../../build/js/build" : '/../../production/js/build',
//     output: {
//         path: NODE_ENV == 'development' ? __dirname + "/../../build/js" : __dirname + '/../../production/js',
//         filename: 'build.min.js'
//     },
//     module: {
//         target: 'node',
//         node: {
//             fs: "empty"
//         },
//     },
//     plugins: [
//         new UglifyJsPlugin({
//           include: /\.min\.js$/,
//           minimize: true,
//           comments: false,
//           output: {
//             'inline_script': true
//           }
//         })
//     ],
//   performance : {
//     hints : false
//   }
// };
//
// module.exports = config;


'use strict';

const UglifyJsPlugin = require('./../../node_modules/webpack-uglify-js-plugin');
const node_modules = './unity-core/node_modules/';
const root = './gateway/';

let config = {
  entry: NODE_ENV == 'development' ? "/../../build/js/build.js" : '/../../production/js/build.js',
  output: {
    path: NODE_ENV == 'development' ? __dirname + "/../../build/js" : __dirname + '/../../production/js',
    filename: '[name].min.js'
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: node_modules + 'awesome-typescript-loader',
      query: {
        tsconfig: root + 'tsconfig.json'
      }
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      cacheFolder: root + 'build/cache',
      include: /\.min\.js$/,
      minimize: true,
      comments: false,
      output: {
        'inline_script': true
      }
    })
  ],
  performance : {
    hints : false
  }
};

module.exports = config;
