var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    prettify    = require('gulp-prettify'),
    stylus      = require('gulp-stylus'),
    // minifyCSS   = require('gulp-minify-css'),
    // uglify      = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    watch       = require('gulp-watch')
;

gulp.task('styles', function() {
  gulp.src('project/assets/styles/styles.styl')
  .pipe(stylus())
  .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('markup', function() {
  gulp.src('project/**/*.jade')
  .pipe(jade())
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest('build/'));
});

gulp.task('browser-sync', function () {
  var files = [
  'build/**/*.html',
  'build/assets/**/*.html',
  'build/assets/css/**/*.css',
  'build/assets/img/**/*.svg',
  'build/assets/img/**/*.jpg',
  'build/assets/img/**/*.gif',
  'build/assets/img/**/*.png',
  'build/assets/js/**/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('project/*.jade', ['markup']);
  gulp.watch('project/assets/styles/**/*.styl', ['styles']);
});

gulp.task('default', ['styles','markup','watch','browser-sync']);
