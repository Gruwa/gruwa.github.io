'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";//сборка продакшен - NODE_ENV или разработка - development (запуск режимаразработки NODE_ENV=development webpack - !!без пробелов возле =!!)
const webpack = require('webpack'); //подключение локального вебпека(установленного в папку проекта - как у гальпа)

module.exports = {
    context: __dirname + "/js/src", // общий путь к папке с исходдными файламиб благодаря чему можно не указывать везде полный путь

    entry: {
        script: "./script", //путь к файлу со всеми прописанными модулями для этой сборки
        dopmodules: "./dopmodules",
        common: "./common"// в ручную создается файл common.js в директориии сюда прописывается, в него входят обчие куски и тот код который мы в начале допишем , опять же общий для всех js файлов этой сборки. Если написать ["./script", "./common"] тогда в common будет обязательно вклучено содержание сборки script
    },
    output: {
        path: __dirname + "/js/dist", //путь к конечному файлу
        filename: "[name].js", //конечный файл
        library: "[name]" //подключения библеотеки, т.е. подключение всех переменных из сбокри через home.peremennaya
    },

    externals: {    //подключение переменных из подключаемых библиотек, (lodash, jquery и др...)
        lodash: "_"
    },

    watch: NODE_ENV == "development", //включения вотча в девелопменте

// таймаут для вотча 100мс
    watchOptions: {
        aggregateTimeout: 100
    },
// source-map - навигания по коду подключенным файлам, а не в конечном файле
// (для продакшена - "source-map"(отдельным файлом долго), для разработки - "eval"(быстрая пересборка), )
    devtool: NODE_ENV == "development" ? "eval" : "source-map",
// плагины
    plugins: [
        new webpack.NoErrorsPlugin(), // не будут создаваться файлы при ошибке компиляции
        new webpack.DefinePlugin({ //для запускарежима разраба и продакшена
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({ //выделяет общую часть из сборок и помещает ее в 1 файл
            name: "common",
            chunks: ['dopmodules', 'script'], // указываем конкретно из каких файлов выносить общую составляющую]
            minChunks: 2 // Сколько раз минимум должен встречаться общий код, что бы его вынести в чанк
        })
    ],
// лоадерсы
    module:{
        loaders: [{
            test: /\.js$/, //проверяет расширение, если проходит тогда работает (include - проверка пути, делает тоже что и test)
            loader: 'babel?optional[]=runtime' //?optional[]=runtime - для выноса функций (тип бабеля и других) в отдельный модуль
        }]
    }

};

if (NODE_ENV == "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // можно добавить другие настройки кроме ворнинга
            }
        })
    );
}
