 'use strict';

const plugins = require('gulp-load-plugins')();

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
gulp.task('webserver', function(callback){ // reload webserver
    browserSync({
        server: {
            baseDir: './'
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
    .pipe(gulp.dest('dist/js'))
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
