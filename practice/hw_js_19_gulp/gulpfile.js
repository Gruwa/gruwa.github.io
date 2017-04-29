 'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var scss = require('gulp-scss');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat-css');


gulp.task('default', function (callback) {
    gulp.src('css/src/**/*.scss')
    .pipe(scss())
    .pipe(debug({title: 'scss'}))
    .pipe(gulp.dest('css/dest/'))
    .pipe(debug({title: 'dest'}));
    gulp.src('css/dest/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'sourcemaps'}))
    .pipe(uglify('style.min.css'))
    .pipe(debug({title: 'uglify'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/dest'));


    // .gulp.src('js/src/**/*.js');

    callback();
});
