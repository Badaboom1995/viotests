'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
 
gulp.task('sass', function () {
  gulp.src('./sass/**/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(notify("Всё готово, Хозяин!"));
});

gulp.task('build:css', function () {
  gulp.src('./css/*.css')
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(uncss({
            html: ['*.html']
        }))
    .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false
  }))

  .pipe(gulp.dest('../prod/css'))
});

gulp.task('build:img', function () {
  gulp.src('./img/*.*')
   .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
   .pipe(gulp.dest('./img/imagemin'));
});

gulp.task('build:js', function () {
  gulp.src('./js/*.js')
  .pipe(uglify())
   .pipe(gulp.dest('../prod/js/script.js'));    
});


 
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});