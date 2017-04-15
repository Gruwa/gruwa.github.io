'use strict';

var gulp = require ('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function () {
    gulp.src('css/src/**/*.css')
    // .pipe(uglify())
    .pipe(concat('style.main.min.css'))
    .pipe(gulp.dest('css/dest'));
    gulp.src('js/src/**/*.js')
    // .pipe(uglify())
    .pipe(concat('script.main.min.js'))
    .pipe(gulp.dest('js/dest'));
    return;
});
