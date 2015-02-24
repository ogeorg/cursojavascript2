(function () {
  'use strict';

  var gulp = require('gulp'),
    connect = require('gulp-connect');

  var paths = {
    src: 'src/'
  };

  gulp.task('connect', function () {
    connect.server({
      port: 8000,
      livereload: true
    });
  });
  
  gulp.task('reload', function () {
    return gulp.src(paths.src + '**/*')
        .pipe(connect.reload());
  });

  gulp.task('watch', function () {
    gulp.watch(paths.src + '**/*', ['reload']);
  });
  
  gulp.task('default', ['connect', 'watch']);
}());