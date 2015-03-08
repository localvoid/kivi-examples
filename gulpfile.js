'use strict';

var gulp = require('gulp');
var gulp_if = require('gulp-if');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var deploy = require('gulp-gh-pages');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var NODE_ENV = process.env.NODE_ENV || 'development';
var BROWSERSYNC_PORT = parseInt(process.env.BROWSERSYNC_PORT) || 3000;
var RELEASE = (NODE_ENV === 'production');
var DEST = './build';

var EXAMPLES = [
  'hello',
  'basic',
  'anim',
  'todo',
  'value-diff'
];

gulp.task('clean', del.bind(null, [DEST]));

for (var i = 0; i < EXAMPLES.length; i++) {
  var e = EXAMPLES[i];
  var out = DEST + '/' + e;

  gulp.task('example-script-' + e, function(e, out) {
    var bundler = browserify({
      entries: ['./web/' + e + '/main.js'],
      debug: !RELEASE
    });

    return bundler
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulp_if(RELEASE, uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(out))
      .pipe(reload({stream: true}));
  }.bind(null, e, out));

  gulp.task('example-html-' + e , function(e, out) {
    gulp.src('./web/' + e + '/index.html')
      .pipe(gulp.dest(out))
      .pipe(reload({stream: true}));
  }.bind(null, e, out));
}

gulp.task('example-scripts', EXAMPLES.map(function(e) { return 'example-script-' + e; }));
gulp.task('example-htmls', EXAMPLES.map(function(e) { return 'example-html-' + e; }));
gulp.task('examples', ['example-scripts', 'example-htmls']);

gulp.task('serve', ['default'], function() {
  browserSync({
    open: false,
    port: BROWSERSYNC_PORT,
    notify: false,
    server: 'build'
  });

  for (var i = 0; i < EXAMPLES.length; i++) {
    var e = EXAMPLES[i];
    gulp.watch('./web/' + e + '/main.js', ['example-script-' + e]);
    gulp.watch('./web/' + e + '/index.html', ['example-html-' + e]);
  }
});

gulp.task('deploy', ['default'], function () {
  return gulp.src(DEST + '/**/*')
    .pipe(deploy());
});

gulp.task('default', ['examples']);
