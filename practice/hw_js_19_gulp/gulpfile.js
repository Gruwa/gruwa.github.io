 'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');



gulp.task('default', function (callback) {
    gulp.src('css/src/style.scss')
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'sourcemaps'}))
    .pipe(sass())
    .pipe(debug({title: 'sass'}))
    .pipe(uglifycss())
    .pipe(debug({title: 'uglifycss'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/dest'));
    gulp.src('js/src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'sourcemaps'}))
    .pipe(babel({presets: ['es2015']}))
    .pipe(debug({title: 'babel'}))
    // .pipe(uglify(''))
    // .pipe(debug({title: 'uglify'}))
    .pipe(concat('script.min.js'))
    .pipe(debug({title: 'concat'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js/dest'));
    gulp.watch('css/src/**/*.scss', ['default']);
    gulp.watch('js/src/**/*.js', ['default']);
    callback();
});
