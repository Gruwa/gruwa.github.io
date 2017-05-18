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
const pngquant = require('imagemin-pngquant');//минимизация картинок
const watch = require('gulp-watch');// наблюдение за изменениями файлов

let path = {
    src: { // project files
        html: 'project/html/index.html',
        js: 'project/js/*.js',
        css: 'project/style/style.scss',
        img: 'project/img/**/*.*',
        font: 'project/font/**/*.*'
    },
    dest: { // build files
        html: 'build/',
        js: 'build/js/script.js',
        css: 'build/style',
        img: 'build/img/',
        font: 'build/font/'
    },
    watch: { // watch worker
        html: 'project/html/**/*.html',
        js: 'project/js/**/*.js',
        css: 'project/style/**/*.scss',
        img: 'project/img/**/*.*',
        font: 'project/font/**/*.*'
    },
    clean: 'build/'
};
gulp.task('plugins', function(callback) {
    plugins();
    callback();
});
gulp.task('webserver', function(callback){ // reload webserver
    browserSync({
        server: {
            baseDir: 'build/'
        },
        host: 'localhost',
        port: 9000,
        tunnel: true,
        logPrefix: "Frontend_Devil"
    });
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
    .pipe(gulp.dest('build/js'))
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
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(path.dest.img))
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
    rimraf(path.clean, callback);
});
gulp.task('default', [
    'build',
    'webserver',
    'watch'
]);
