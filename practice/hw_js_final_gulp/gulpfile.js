'use strict';

const gulp = require('gulp'); // сам Gulp
const sourcemaps = require('gulp-sourcemaps'); //предназначен для генерации css sourscemaps, которые понадобятся при отладке кода
const sass = require('gulp-sass'); //предназначен для компиляции SCSS и SASS кода.
const uglifycss = require('gulp-uglifycss'); //будет минимизировать наш css, создаст один файл *.min.css
const debug = require('gulp-debug'); // наш дебаггер
const uglify = require('gulp-uglify'); //будет минимизировать наш JS, создаст один файл *.min.js
const concat = require('gulp-concat'); //предназначен для объединения *.js файлов
const babel = require('gulp-babel'); //предназначен для вывода js кода понятного для старых браузеров
const include = require('gulp-file-include'); //плагин, позволяющий использовать конструкцию для подключения html файлов
const rimRaf = require('rimraf'); //предназначен для очистки папок по завершению сборки (rm -rf для nodejs)
const browserSync = require('browser-sync'); //понадобится  для запуска локального сервера для reload-а
const reload = browserSync.reload; //предназначен для запуска самого реоада
const preFixer = require('gulp-autoprefixer'); //авто-добавление добавляет вендорные префиксы (-webkit, -o, -moz) к CSS свойствам, нужно чтобы ваш код поддерживался во всех браузерах.
const imagemin = require('gulp-imagemin'); //минимизация картинок
const pngquant = require('imagemin-pngquant');//минимизация картинокgulp
const watch = require('gulp-watch');// наблюдение за изменениями файлов
const imageminMozjpeg = require('imagemin-mozjpeg');
const svgstore = require('gulp-svgstore'); // спраqт svg

let path = { // прописываем все нужные пути
   src: { //пути откуда будут взяты файлы
       html: 'src/html/index.html',
       js: 'src/js/**/*.js',
       css: 'src/style/style.scss',
       img: 'src/img/*.*',
       svg: 'src/img/svg/*.svg',
       font: 'src/font/**/*.*'
   },
   dest: { //пути для готовых файлов после сборки
       html: 'dev/',
       js: 'dev/js/script.js',
       css: 'dev/style/',
       img: 'dev/img/',
       svg: 'dev/img/',
       font: 'dev/font/'
   },
   watch: { //пути по которым смотреть вотчеру
       html: 'src/html/**/*.html',
       js: 'src/js/**/*.js',
       css: 'src/style/**/*.scss',
       img: 'src/img/*.*',
       svg: 'src/img/svg/*.svg',
       font: 'src/font/**/*.*'
   },
   clean: 'dev/**/*.*'
};
gulp.task('webserver', function(callback){ //запуск вебсервера для релоада
   browserSync({
       server: {
           baseDir: 'dev/'
       },
       host: 'localhost',
       port: 9000,
       tunnel: true,
       logPrefix: "Frontend"
   });
   callback();
});
gulp.task('jsBuild', function(callback) {
   gulp.src(path.src.js)
   .pipe(sourcemaps.init())
   .pipe(debug({title: 'sourcemaps'}))
   .pipe(babel({presets: ['es2015']}))
   .pipe(debug({title: 'babel'}))
   .pipe(uglify(''))
   .pipe(debug({title: 'uglify'}))
   .pipe(concat('script.min.js'))
   .pipe(debug({title: 'concat'}))
   .pipe(sourcemaps.write('.'))
   .pipe(gulp.dest('dev/js'))
   .pipe(reload({stream: true})); //перезапуск сервера собновлениями
   callback();
});
gulp.task('styleBuild', function (callback) {
   gulp.src(path.src.css)
   .pipe(sourcemaps.init())
   .pipe(debug({title: 'sourcemaps'}))
   .pipe(sass())
   .pipe(debug({title: 'sass'}))
   .pipe(preFixer())
   .pipe(debug({title: 'preFixer'}))
   .pipe(uglifycss())
   .pipe(debug({title: 'uglifycss'}))
   .pipe(sourcemaps.write('.'))
   .pipe(gulp.dest(path.dest.css))
   .pipe(reload({stream: true}));
   callback();
});
gulp.task('imgBuild', function (callback) {
   gulp.src(path.src.img)
   .pipe(imagemin([
       imagemin.gifsicle({interlaced: true}),
       imagemin.jpegtran({progressive: true}),
       imagemin.optipng({optimizationLevel: 5}),
       imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
   .pipe(gulp.dest(path.dest.img))
   .pipe(reload({stream: true}));
   callback();
});
gulp.task('svgBuild', function (callback) {
   gulp.src(path.src.svg)
   .pipe(svgstore())
   .pipe(gulp.dest(path.dest.svg))
   .pipe(reload({stream: true}));
   callback();
});
gulp.task('htmlBuild', function(callback) {
    gulp.src(path.src.html)
    .pipe(include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(path.dest.html))
    .pipe(reload({stream: true}));
    callback();
});
gulp.task('fontBuild', function (callback) {
   gulp.src(path.src.font)
   .pipe(gulp.dest(path.dest.font))
   .pipe(reload({stream: true}));
   callback();
});
gulp.task('build', [
   'htmlBuild',
   'jsBuild',
   'styleBuild',
   'imgBuild',
   'svgBuild',
   'fontBuild'
]);
gulp.task('watch', function() {
   watch([path.watch.html], function(ev, callback) {
       gulp.start('htmlBuild');
   });
   watch([path.watch.css], function(ev, callback) {
       gulp.start('styleBuild');
   });
   watch([path.watch.js], function(ev, callback) {
       gulp.start('jsBuild');
   });
   watch([path.watch.img], function(ev, callback) {
       gulp.start('imgBuild');
   });
   watch([path.watch.font], function(ev, callback) {
       gulp.start('fontBuild');
   });

});
gulp.task('clean', function (callback) {
   rimRaf(path.clean, callback);
});
gulp.task('default', [
    // 'clean',
    'build',
    'webserver',
    'watch'
]);
