var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sourcemaps  = require('gulp-sourcemaps');

/**
 * BrowserSync config
 */
var serveConfig = {
  files: [
    'src/**/*.html',
    'src/js/**/*.js',
    'src/img/*.{png|gif}',
  ],
  server: {
    baseDir: 'src/'
  },
  open: false,
  notify: false,
  logPrefix: 'ife'
};


/**
 * Serve task
 */
gulp.task('browser-sync', function () {
  browserSync(serveConfig);
});

/**
 * Less task
 */
gulp.task('less', function () {
  return gulp.src(['src/less/app.less'])
    .pipe(sourcemaps.init())
    .pipe(less())
    .on('error', function (e) {
      console.log(e);
      this.emit('end');
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(reload({stream:true}));
});


/**
 * Default task
 */
gulp.task('default', ['less', 'browser-sync'], function () {
  gulp.watch('src/less/**/*.less', ['less']);
});
