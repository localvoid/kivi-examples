'use strict';

var gulp = require('gulp');
var del = require('del');
var closureCompiler = require('gulp-closure-compiler');
var jstyle = require('gulp-jstyle');
var replaceIds = require('gulp-replace-ids');
var browserSync = require('browser-sync');
var ghPages = require('gulp-gh-pages');

var BUILD_MINIFY = process.env['BUILD_MINIFY'] ? true : false;
var BUILD_DEBUG = process.env['BUILD_DEBUG'] ? true : false;

var CLOSURE_OPTS = {
  fileName: 'main.js',
  compilerPath: 'node_modules/closurecompiler/compiler/compiler.jar',
  continueWithWarnings: true,
  compilerFlags: {
    define: [],
    closure_entry_point: 'main',
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    language_in: 'ECMASCRIPT6_STRICT',
    language_out: 'ECMASCRIPT5_STRICT',
    use_types_for_optimization: true,
    only_closure_dependencies: true,
    output_wrapper: '(function(){%output%}).call();',
    warning_level: 'VERBOSE',
    jscomp_warning: 'reportUnknownTypes',
    summary_detail_level: 3
  }
};

if (!BUILD_MINIFY) {
  CLOSURE_OPTS.compilerFlags.compilation_level = 'SIMPLE_OPTIMIZATIONS';
  CLOSURE_OPTS.compilerFlags.formatting = 'PRETTY_PRINT';
}
if (!BUILD_DEBUG) {
  CLOSURE_OPTS.compilerFlags.define.push('goog.DEBUG=false', 'kivi.DEBUG=false');
}

var EXAMPLES = ['hello', 'anim'];

gulp.task('clean', del.bind(null, ['build', 'dist']));

EXAMPLES.forEach(function(name) {
  gulp.task('js:' + name, ['css:' + name], function() {
    return gulp.src([
        'node_modules/kivi/src/**/*.js',
        'src/base.js',
        'build/' + name + '/css/css_map.js',
        'src/' + name + '/main.js'])
        .pipe(closureCompiler(CLOSURE_OPTS))
        .pipe(gulp.dest('build/' + name));
  });

  gulp.task('html:' + name, ['css:' + name], function() {
    return gulp.src('src/' + name + '/index.html')
        .pipe(replaceIds({
          dict: BUILD_MINIFY ? 'build/' + name + '/css/css_map.json' : {},
          pattern: "{{\ *getCssName\ +\"([a-zA-Z0-9_-]+)\"\ *}}"
        }))
        .pipe(gulp.dest('build/' + name))
        .pipe(browserSync.reload({stream: true}));
  });

  gulp.task('css:' + name, function() {
    return gulp.src('src/' + name + '/css.js')
        .pipe(jstyle({
          minifyClassNames: BUILD_MINIFY,
          closureMap: true
        }))
        .pipe(gulp.dest('build/' + name + '/css'))
        .pipe(browserSync.reload({stream: true}));
  });
});

gulp.task('js', EXAMPLES.map(function(name) { return 'js:' + name }));
gulp.task('html', EXAMPLES.map(function(name) { return 'html:' + name }));
gulp.task('css', EXAMPLES.map(function(name) { return 'css:' + name }));
gulp.task('build', ['css', 'html', 'js']);

gulp.task('serve', ['build'], function() {
  browserSync({
    open: false,
    port: 3000,
    notify: false,
    server: 'build'
  });

  EXAMPLES.forEach(function(name) {
    gulp.watch('src/' + name + '/main.js', ['js:' + name]);
    gulp.watch('src/' + name + '/index.html', ['html:' + name]);
    gulp.watch('src/' + name + '/css.js', ['css:' + name, 'html:' + name, 'js:' + name]);
  });
});

gulp.task('deploy', ['default'], function () {
  return gulp.src('build/**/*')
      .pipe(ghPages());
});

gulp.task('default', ['build']);
