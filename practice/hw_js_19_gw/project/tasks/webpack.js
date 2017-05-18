'use strict'

import path from 'path'
import webpack from 'webpack'

let config = {
    context: path.resolve(__dirname, '/project'),
    entry: {
        main: [
            './js/script',
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client'
        ]
    },
    output: {
        path: NODE_ENV == 'development' ? __dirname + '/build/js' : __dirname + '/production/js',
        publicPath: '/js/', //интернет путь к нашей сборке
        filename: '[name].js',
        library:  '[name]'
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : null,

  // externals: { // объявляем модульные переменные, типа jqbery и lodash
  //     lodash: '_',
  //     jQuery: '$'
  // },

    module: {
      loaders: [{
          test:   /\.js$/,
            exclude: /\/node_modules\//, // указываем директорию, которую исключаем из обработки
        //   include: __dirname + '/project/js', // указываем директорию в которой будет работать этот лоадер
          loader: 'babel?optional[]=runtime'
      }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.NoErrorsPlugin(), // не позволяет создать не рабочую сборку с ошибками
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

}

function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }
