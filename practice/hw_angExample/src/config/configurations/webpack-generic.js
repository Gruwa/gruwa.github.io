'use strict';

const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const languages = require('../../core/services/locale/locales.json');
const locales = require('../../core/services/locale/locales-view.json');

const ANGULAR_NEXT_REGEXP = /src\/(ng2|app)\//;

// get current whitelabel config
const wlUtils = require('../whitelabel/utils.js');
const whitelabelConfig = wlUtils.getWhitelabelConfig();
// TODO: Move from config to package.json or gulp
wlUtils.generateWhitelabelAndSvg();

// set path to node_modules
let nodeModulesPath;
if (path.basename(process.env.PWD) === 'unity-core') {
  nodeModulesPath = path.resolve('./node_modules/');
} else {
  nodeModulesPath = path.resolve('./unity-core/node_modules/');
}

// create project specific tslint configuration that just reuses the one from Core
const tslintConfig = path.resolve(process.env.PWD, 'tslint.json');
if (!fs.existsSync(tslintConfig)) {
  fs.writeFileSync(tslintConfig, '{\n  "extends": "./unity-core/tslint.json"\n}\n');
}

module.exports = {
  cache: true,
  entry: {},
  output: {
    path: path.resolve('./dist/' + process.env.APP_DIST_DIR),
    filename: '[name].js',
    pathinfo: true
  },
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
        exclude: /node_modules/i
      },
      {
        test: /(\.js|\.ts)$/,
        loader: 'ng-annotate-loader',
        exclude: /node_modules/i
      },
      {
        test: /\.html$/,
        exclude: [/index\.html$/, ANGULAR_NEXT_REGEXP],
        loader: 'ng-cache-loader?prefix=[dir]/[dir]&caseSensitive=true'
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
        exclude: ANGULAR_NEXT_REGEXP,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.css$/,
        include: ANGULAR_NEXT_REGEXP,
        loader: 'raw-loader!css-loader'
      },
      {
        test: /\.scss$/,
        exclude: ANGULAR_NEXT_REGEXP,
        // [SS]: if you need to enable source maps for SCSS files - use "css?sourceMap" and "sass?sourceMap" syntax
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        include: ANGULAR_NEXT_REGEXP,
        loaders: [
          'to-string-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /(\.woff(2)?|\.eot|\.ttf|\.svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: process.env.PWD + '/tsconfig.json' // use tsconfig from dir where npm command run
        },
        exclude: /node_modules/i
      }
    ]
  },
  tslint: {
    emitErrors: false, // true to show warnings as errors
    failOnHint: false, // true to interrupt build
    formatter: 'custom'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
      // move all files from node_modules into vendor.js
      minChunks: module => /node_modules/.test(module.resource)
    }),
    // workaround for "critical dependency" warnings on build
    // https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(/@angular(\\|\/)core/, path.resolve('./src')),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, getMomentRegexpForLocale(locales)),
    new webpack.ContextReplacementPlugin(/node_modules\/angular\-i18n/, getAngularRegexpForLocale(locales)),
    new webpack.ContextReplacementPlugin(/node_modules\/select2\/src\/js\/select2\/i18n/, getSelect2RegexpForTranslations(languages)),
    new HtmlWebpackPlugin({
      title: whitelabelConfig.title,
      inject: 'head', // inject entry <script> tags to page <head>
      hash: true,
      filename: 'index.html',
      favicon: './unity-core/src/core/' +  whitelabelConfig.favicon,
      template: './unity-core/src/core/assets/index.html'
    }),
    new webpack.DefinePlugin({
      WHITELABEL: _.extendWith(
        {},
        whitelabelConfig,
        (objValue, srcValue) => JSON.stringify(srcValue)
      )
    })
  ]
};

function getMomentRegexpForLocale(locales) {
  let langs = _(locales).map((locale) => {
    return String(locale.id).substr(0, 2);
  }).uniq().join('|');

  return new RegExp(langs);
}

function getAngularRegexpForLocale(locales) {
  let langs = locales.map((locale) => {
    return locale.id.replace('-', '\-')
  }).join('|');

  return new RegExp(`angular\-locale_(${langs})`);
}

function getSelect2RegexpForTranslations(languages) {
  let langs = languages.map((locale) => {
    return locale.select2.replace('-', '\-')
  }).join('|');

  return new RegExp(langs);
}
