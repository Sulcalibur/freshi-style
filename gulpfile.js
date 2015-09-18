var gulp           = require('gulp'),
    jade           = require('gulp-jade'),
    prettify       = require('gulp-prettify'),
    stylus         = require('gulp-stylus'),
    browserSync    = require('browser-sync'),
    watch          = require('gulp-watch'),
    flatten        = require('gulp-flatten'),
    gulpFilter     = require('gulp-filter'),
    uglify         = require('gulp-uglify'),
    minifycss      = require('gulp-minify-css'),
    rename         = require('gulp-rename'),
    mainBowerFiles = require('main-bower-files')
;

gulp.task('styles', function() {
  gulp.src('project/assets/styles/styles.styl')
  // .pipe(plumber())
  .pipe(stylus())
  .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('markup', function() {
  gulp.src('project/*.jade')
  // .pipe(plumber())
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

// Define paths variables
var dest_path =  'build';
var src_path = 'src';
// grab libraries files from bower_components, minify and push in /build
gulp.task('publish-components', function() {

  var jsFilter = gulpFilter('*.js', {restore: true});
  var cssFilter = gulpFilter('*.css', {restore: true});
  var stylFilter = gulpFilter('*.styl', {restore: true});
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore: true});

  return gulp.src(mainBowerFiles())

  // grab vendor js files from bower_components, minify and push in /build
  .pipe(jsFilter)
  .pipe(gulp.dest(dest_path + '/assets/js/'))
  .pipe(uglify())
  .pipe(rename({
      suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/assets/js/'))
  // .pipe(jsFilter.restore())

  // grab vendor css files from bower_components, minify and push in /build
  .pipe(stylFilter)
  .pipe(gulp.dest(dest_path + '/assets/css'))
  .pipe(stylus())
  .pipe(minifycss())
  .pipe(rename({
      suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/assets/css'))
  // .pipe(stylFilter.restore())

  // grab vendor css files from bower_components, minify and push in /build
  .pipe(cssFilter)
  .pipe(gulp.dest(dest_path + '/assets/css'))
  .pipe(minifycss())
  .pipe(rename({
      suffix: ".min"
  }))
  .pipe(gulp.dest(dest_path + '/assets/css'))
  // .pipe(cssFilter.restore())

  // grab vendor font files from bower_components and push in /build
  .pipe(fontFilter)
  .pipe(flatten())
  .pipe(gulp.dest(dest_path + '/assets/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('project/*.jade', ['markup']);
  gulp.watch('project/assets/styles/**/*.styl', ['styles']);
});

gulp.task('default', ['styles','markup','watch','browser-sync']);
