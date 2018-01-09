'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const {isInsideCoreRepoDir} = require('../utils.js');

const ANGULAR_NEXT_REGEXP = /src\/(ng2|app)\//;

// TODO: Move from config to package.json or gulp
require('../whitelabel/utils.js').generateWhitelabelAndSvgStubs();

let nodeModulesPath;
let coverageExcludeRegexp;
let commonChunkName;

// check dir where "npm run" command was run and adjust paths
if (isInsideCoreRepoDir()) {
  nodeModulesPath = path.resolve('./node_modules/');
  coverageExcludeRegexp = /node_modules\//;
  commonChunkName = 'src/ng2/bootstrap-unit-tests.ts';
} else {
  nodeModulesPath = path.resolve('./unity-core/node_modules/');
  coverageExcludeRegexp = /(node_modules|unity-core)\//;
  commonChunkName = 'unity-core/src/ng2/bootstrap-unit-tests.ts';
}

// create project specific tslint configuration that just reuses the one from Core
const tslintConfig = path.resolve(process.env.PWD, 'tslint-tests.json');
if (!fs.existsSync(tslintConfig)) {
  fs.writeFileSync(tslintConfig, '{\n  "extends": "./unity-core/tslint-tests.json"\n}\n');
}

const webpackConfig = {
  cache: true,
  resolve: {
    extensions: ['.webpack.js', '.ts', '.js', '.json', '.png', '.jpg', '.html'],
    modules: [nodeModulesPath, 'node_modules']
  },
  resolveLoader: {
    modules: [nodeModulesPath]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        exclude: ANGULAR_NEXT_REGEXP,
        loader: 'ng-cache-loader?prefix=[dir]/[dir]'
      },
      {
        test: /\.html$/,
        include: ANGULAR_NEXT_REGEXP,
        loader: 'raw-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
      {
        test: /\.scss$/,
        loader: 'to-string-loader!null-loader'
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /(\.woff(2)?|\.eot|\.ttf|\.svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: process.env.PWD + '/tsconfig.json', // use tsconfig from dir where npm command run
          sourceMap: false,
          inlineSourceMap: true // use inline sourcemaps for "karma-remap-coverage" reporter
        },
        exclude: /node_modules/
      },
      {
        // only include JS or TS files which don't end with .spec*
        // also skip node and core files from measuring coverage
        test: /^((?!spec).)*\.(t|j)s$/,
        exclude: coverageExcludeRegexp,
        enforce: 'post',
        loader: 'istanbul-instrumenter-loader'
      }
    ]
  },
  tslint: {
    configFile: 'tslint-tests.json',
    emitErrors: true, // true to show warnings as errors
    failOnHint: false, // true to interrupt build
    formatter: 'custom'
  },
  plugins: [
    // extract rarely changed files to common chunk to optimize rebuilds performance
    new webpack.optimize.CommonsChunkPlugin({
      name: commonChunkName,
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new webpack.DefinePlugin({
      ENVIRONMENT: '"unitTest"'
    }),
    // workaround for "critical dependency" warnings on build
    // https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(/@angular(\\|\/)core/, path.resolve('./src')),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb|ru|de/),
    new webpack.ContextReplacementPlugin(/node_modules\/angular\-i18n/, /angular\-locale_(en\-us|ru\-ua|de\-de)/), // 3 locales should be enough for unitTests
    new webpack.DefinePlugin({
      AUTH: {},
      WHITELABEL: {}
    }),
    // by default webpack generates source maps for .(js|css) files while we need .ts
    // this standard plugin allows fine tuning of source map generation that allows to force processing .ts files
    // https://webpack.github.io/docs/list-of-plugins.html#sourcemapdevtoolplugin
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the SourceMap is inlined
      test: /\.(ts|js)($|\?)/i // process .ts and .js files only
    })
  ]
};

module.exports = webpackConfig;
