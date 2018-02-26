var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');

var fs = require('fs');


var json = JSON.parse(fs.readFileSync('./package.json'));

var dependencies = [
    json.folders.deps + '/angular/angular.min.js',
    json.folders.deps + '/moment/min/moment.min.js',
    json.folders.deps + '/angular-cookies/angular-cookies.min.js',
    json.folders.deps + '/angular-animate/angular-animate.min.js',
    json.folders.deps + '/angular-sanitize/angular-sanitize.min.js',
    json.folders.deps + '/bootstrap/dist/js/bootstrap.bundle.js',
    json.folders.deps + '/bootstrap/dist/js/bootstrap.js'
];

var cssDeps = [
    json.folders.deps + '/bootstrap/dist/css/bootstrap.css',
    json.folders.deps + '/bootstrap/dist/css/bootstrap-reboot.css',
    json.folders.deps + '/bootstrap/dist/css/bootstrap-grid.css'
];


var appEssentials = [
    json.folders.main + '/app.js',
    json.folders.services + '/RESTService.js'
];

var appControllers = [
    json.folders.controllers + '/indexController.js'
];


gulp.task('compile_app_essentials', function() {

    gutil.log('Compiling main app essential files...');

    gulp.src(appEssentials)

        .pipe(concat('app_essentials.js'))
        .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts/dist'));
});

gulp.task('compile_app_components', function() {

    gutil.log('Compiling app component files...');

    for(var i=0; i<appControllers.length; i++) {
        gulp.src([appControllers[i]])
            .pipe(concat(appControllers[i].split('/')[appControllers[i].split('/').length-1]))
            .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('public/javascripts/dist/controllers/'));
    }
});

gulp.task('compile_dependencies', function() {

    gutil.log('Compiling app dependencies...');
    return gulp.src(dependencies)

        .pipe(concat('app_deps.js'))
        .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts/dist'));
});

gulp.task('compile_scss', function () {

    return gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gutil.env.env === 'production' ? minifyCSS() : gutil.noop())
        .pipe(gulp.dest('public/css/dist'));
});

gulp.task('get_css', function () {

    for(var i=0; i<cssDeps.length; i++) {
        gulp.src([cssDeps[i]])
            .pipe(concat(cssDeps[i].split('/')[cssDeps[i].split('/').length-1]))
            .pipe(gulp.dest('public/css/dist'));
    }
});


gulp.task('clean', function () {
    del(['public/javascripts/dist', 'public/css/dist']);
});

gulp.task('default', ['compile_dependencies', 'compile_app_essentials', 'compile_app_components', 'compile_scss', 'get_css'], function() {

});