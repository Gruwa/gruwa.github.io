var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

const extractSass = new ExtractTextPlugin({
    filename: 'assets/style/style.css',
    allChunks: true
});

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.css', '.scss', '.html']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
        {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/font/[name].[ext]?[hash:6]'
      },
      {
        test: /\.(ico)$/,
        loader: 'file-loader?name=assets/img/[name].[ext]?[hash:6]'
      },
    {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
        {
            loader: 'file-loader',
            options: {
            name: 'assets/img/[name].[ext]?[hash:6]'
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
            mozjpeg: {
                quality: 65
            },
            pngquant:{
                quality: "50-70",
                speed: 4
            },
            svgo:{
                plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
                ]
            },
            gifsicle: {
                optimizationLevel: 6,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 6,
                interlaced: false
            }
            }
        }
        ]
    },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    extractSass
  ]
};