var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    wiredep     = require('wiredep').stream;

gulp.task('serve', function(){
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
});

gulp.task('build', function(){
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'bower_components',
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});
