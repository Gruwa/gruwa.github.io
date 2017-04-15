'use strict';

var gulp = require ('gulp');
var concat = require ('gulp-concat');
var uglify = require ('gulp-uglify');
var debug = require ('gulp-debug')

gulp.task('default', function () {
    gulp.src('css/src/**/*.css')
    .pipe(debug({title: 'src'}))
    // .pipe(uglify())
    // .pipe(debug({title: 'uglify'}))
    .pipe(concat('style.main.min.css'))
    .pipe(debug({title: 'concat'}))
    .pipe(gulp.dest('css/dest'))
    .pipe(debug({title: 'dest'}));
    gulp.src('js/src/**/*.js')
    .pipe(debug({title: 'src'}))
    // .pipe(uglify())
    // .pipe(debug({title: 'uglify'}))
    .pipe(concat('script.main.min.js'))
    .pipe(debug({title: 'concat'}))
    .pipe(gulp.dest('js/dest'))
    .pipe(debug({title: 'dest'}));
    
    return;
});
