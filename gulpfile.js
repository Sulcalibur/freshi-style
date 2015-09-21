var gulp         = require('gulp'),
    jade         = require('gulp-jade'),
    postcss      = require('gulp-postcss'),
    prettify     = require('gulp-prettify'),
    stylus       = require('gulp-stylus'),
    browserSync  = require('browser-sync'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    coffee       = require('gulp-coffee'),
    concat       = require('gulp-concat'),
    sourcemaps   = require('gulp-sourcemaps'),
    // csswring     = require('csswring'),
    lost     = require('lost'),
    autoprefixer = require('autoprefixer');
    watch        = require('gulp-watch')
;

gulp.task('styles', function() {
  var processors = [
    lost,
    autoprefixer({browsers: ['last 2 version']})
    // csswring
  ];

  return gulp.src('project/assets/styles/styles.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss(processors))
    // .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('markup', function() {
  gulp.src('project/*.jade')
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

// var pre_coffee_files = ['project/assets/scripts/scriptspre.coffee'];
// var post_coffee_files = ['project/assets/scripts/scriptspost.coffee'];

gulp.task('coffee', function() {
    return gulp.src('project/assets/scripts/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('project/assets/scripts/'));
});

gulp.task('scriptspre', function() {
  return gulp.src([
                    'bower_components/modernizr/modernizr.js',
                    'project/assets/scripts/scriptspre.js'
                  ])
    .pipe(sourcemaps.init())
    .pipe(concat('pre.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js/'));
});

gulp.task('scriptspost', function() {
  return gulp.src([
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/wow.js/dist/wow.js',
                    'project/assets/scripts/scriptspost.js',
                  ])
    .pipe(sourcemaps.init())
    .pipe(concat('post.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js/'));
});

gulp.task('scripts',['coffee','scriptspre','scriptspost']);

gulp.task('watch', function() {
  gulp.watch('project/*.jade', ['markup']);
  gulp.watch('project/assets/styles/**/*.styl', ['styles']);
  gulp.watch('project/assets/scripts/**/*.coffee', ['scripts']);
});

gulp.task('default', ['styles','markup','watch','scripts','browser-sync']);
