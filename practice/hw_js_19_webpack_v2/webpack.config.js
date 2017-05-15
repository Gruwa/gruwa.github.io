'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');



module.exports = {
    context: __dirname + '/project/js', // директория в которой лежат js  указанные в entry
    entry: {
        script: './script',
        about: './about', // вторая точка входа для страницы about
        common: './common' // если CommonsChunk файл - common указать точкой входа и создать его в project и поместить свой кодб то в чанк войдет как код который мы сами написали так и те модули которые добавит вебпек в чанк
        // common: ['./about', './common'] // если записать так, то содиржимое about будет в обязательном порядке включено в common ну и его общее содержимое с другими точками будет удалено из других точек входа
    },
    output: {
        path: NODE_ENV == 'development' ? __dirname + '/build/js' : __dirname + '/production/js',
        publicPath: '/js/', //интернет путь к нашей сборке
        filename: '[name].js',
        library:  '[name]'
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
      aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? 'source-map' : null,

  externals: { // объявляем модульные переменные, типа jqbery и lodash
      lodash: '_',
      jQuery: '$'
  },

  module: {
      loaders: [{
          test:   /\.js$/,
          //   exclude: /\/node_modules\//, // указываем директорию, которую исключаем из обработки
          include: __dirname + '/project/js', // указываем директорию в которой будет работать этот лоадер
          loader: 'babel?optional[]=runtime'
      }]

  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    }),

    new webpack.NoErrorsPlugin(), // не позволяет создать не рабочую сборку с ошибками

    new webpack.optimize.CommonsChunkPlugin({
        name: 'common', //имя новой сборки содержащей общие части всех сборок
        // minChanks: 2 // выносит модули которые выносятся в 2-х точках сборки
        // chunks: ['script', 'about'] // с такой записью в common попадут общие чанки только из script и about
    }),

    // new webpack.ProvidePlugin({ // только установленных через npm, если в коде будет использоваться lodashю тогда он подтянет, если нет подтягивать не будет, можно использовать вместо рекваера каждый раз плагина в модулях, лучше писать в каждом модуле рекваер
    //     _: 'lodash'
    // }),

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

};


// if (process.env.NODE_ENV === 'production') {
//     plugins.push(new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}));
// }

// if (NODE_ENV == 'production') {
//   module.exports.plugins.push(
//       new webpack.optimize.UglifyJsPlugin({
//           beautify: false,
//           comments: false,
//         //   compress: {
//         //       sequences:      true,
//         //       booleans:       true,
//         //       loops:          true,
//         //       unused:         true,
//         //     //   warnings:       false,
//         //       drop_console:   true,
//         //       unsafe:         true
//         //   }
//       })
//   );
// }
