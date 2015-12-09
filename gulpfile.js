var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    browserify      = require('browserify'),
    watchify        = require('watchify'),
    browserSync     = require('browser-sync'),
    source          = require('vinyl-source-stream'),
    uglify          = require('gulp-uglify'),
    buffer          = require('vinyl-buffer'),
    browserSync     = require('browser-sync'),
    sourcemaps      = require('gulp-sourcemaps'),
    jstify          = require('jstify'),
    postcss         = require('gulp-postcss'),
    lost            = require('lost'),
    precss          = require('precss'),
    shortcss        = require('postcss-short'),
    rucksack        = require('rucksack-css'),
    autoprefixer    = require('autoprefixer');

// Browserify
gulp.task('browserify', function () {
  var bundler = browserify('./app/js/app.js');

  bundler.transform('jstify');

  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.build.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

// Browserify watchify
gulp.task('watchify', function() {
  watchify.args.debug = true;
  var bundler = watchify(browserify('./app/js/app.js', watchify.args));

  bundler.transform('jstify');

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log.bind(gutil));

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.build.js'))
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream({once: true}));
  }

  return rebundle();
});

gulp.task('serve', function(){
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app',
      middleware: modRewrite([
        '!\\.\\w+$ /index.html [L]'
      ]),
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch("app/css/**/*.css", ['css']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Post CSS
gulp.task('css', function () {
  var processors = [
    precss,
    shortcss,
    rucksack,
    lost,
    autoprefixer
  ];
  return gulp.src('app/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['css', 'watchify', 'browser-sync']);
gulp.task('dev', ['css', 'watchify', 'browser-sync']);
gulp.task('build', ['css', 'browserify']);
