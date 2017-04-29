'use strict';

const NODE_ENV = process.env.NODE_ENV || "development";//сборка продакшен - NODE_ENV или разработка - development (запуск режимаразработки NODE_ENV=development webpack - !!без пробелов возле =!!)
const webpack = require('webpack'); //подключение локального вебпека(установленного в папку проекта - как у гальпа)

module.exports = {
    entry: "./js/src/script", //путь к файлу чо всеми прописанными модулями
    output: {
        path: __dirname + "/js/dist", //путь к конечному файлу
        filename: "build.js", //конечный файл
        library: "home" //подключения библеотеки, т.е. подключение всех переменных из сбокри через home.peremennaya
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
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],
// лоадерсы
    module:{
        loaders: [{
            test: /\.js$/, //проверяет расширение, если проходит тогда работает (include - проверка пути, делает тоже что и test)
            loader: 'babel?optional[]=runtime' //?optional[]=runtime - для выноса функций (тип бабеля и других) в отдельный модуль
        }]
    }

}
