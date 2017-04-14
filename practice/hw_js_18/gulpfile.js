'use strict';

const gulp = require ('gulp');

gulp.task('default', function () {
    return gulp.src(['css/src/*.css','js/src/*.js'])
    .pipe(gulp.dest(function(file){
        return file.extname == '.js' ? 'js/dest' : 'css/dest';
    }));
});
