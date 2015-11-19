var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    sourcemaps    = require('gulp-sourcemaps'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    modRewrite    = require('connect-modrewrite'),
    wiredep       = require('wiredep').stream;

gulp.task('css', function () {
  var processors = [
    autoprefixer
  ];
  return gulp.src('app/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/build/css'))
    .pipe(browserSync.stream());
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
  gulp.watch("app/js/**/*.js").on('change', browserSync.reload);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('bower', function(){
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'bower_components',
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('default', ['serve']);
gulp.task('dev', ['serve', 'bower']);
gulp.task('build', ['bower']);
