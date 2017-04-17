'use strict';

var gulp = require ('gulp'); //сам гальп
var concat = require ('gulp-concat'); //объеденение файлов css, js
var uglify = require ('gulp-uglify'); //минимизация файлов
var debug = require ('gulp-debug'); //дебагер
var sourcemaps = require ('gulp-sourcemaps'); // отчет по проведенным изменениям
var stylus = require ('gulp-stylus'); //хороший вопрос
// var uncss = require('gulp-uncss'); //удаляет не используемый цсс
var uglifycss = require('gulp-uglifycss'); //минимизация файлов css


gulp.task('default', function (callback) {
    gulp.src('css/src/**/*.css')
        .pipe(debug({title: 'src'}))
        // .pipe(stylus())
        .pipe(debug({title: 'stylus'}))
        .pipe(sourcemaps.init())
        // .pipe(uncss({html: 'index.html'}))
        .pipe(debug({title: 'uncss'}))
        .pipe(uglifycss())
        .pipe(debug({title: 'uglify'}))
        .pipe(concat('style.main.min.css'))
        .pipe(debug({title: 'concat'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/dest'))
        .pipe(debug({title: 'dest'}));
    gulp.src('js/src/**/*.js')
        // .pipe(stylus())
        .pipe(sourcemaps.init())
        .pipe(debug({title: 'src'}))
        .pipe(uglify())
        .pipe(debug({title: 'uglify'}))
        .pipe(concat('script.main.min.js'))
        .pipe(debug({title: 'concat'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js/dest'))
        .pipe(debug({title: 'dest'}));

    callback();
});

// gulp.watch('js/src/**/*.*', gulp.parallel('default'));
// gulp.watch('css/src/**/*.*', gulp.series('default'));
