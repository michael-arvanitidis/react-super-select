var jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    recess = require('gulp-recess'),
    runSequence = require('run-sequence');

module.exports = function(gulp, config) {

  gulp.task('watch', [
    'docs_watch',
    'watch:examples-lint'
  ]);

  // tasks linting and watching acts as standalone
  gulp.task('lint:tasks', function() {
    return gulp.src(config.tasks.lint.js)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('watch:tasks', [
    'lint:tasks',
  ], function() {
    gulp.watch([config.tasks.lint.js], ['lint:tasks']);
  });

  gulp.task('lint-js', ['jsx'], function() {
    return gulp.src(config.component.lint.js)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('lint-less', function () {
      return gulp.src(config.component.lint.less)
          .pipe(recess({
            strictPropertyOrder: false,
            noIDs: true,
            noJSPrefix: true,
            noOverqualifying: false,
            noUnderscores: true,
            noUniversalSelectors: false
          }))
          .pipe(recess.reporter({
            fail: false
          }));
  });

  gulp.task('less-compile', function () {
      return gulp.src(config.component.lint.less)
          .pipe(less())
          .pipe(gulp.dest('dist'));
  });

  gulp.task('watch:examples-lint', function() {
    runSequence(  'jsx',
                  'lint-js',
                  'lint-less',
                  'less-compile',
                  function() {
                    gulp.watch([config.component.lint.js], ['lint-js']);
                    gulp.watch([config.component.lint.less], ['lint-less', 'build:example:css']);
                  });
  });

  gulp.task('docs_lint-js', ['jsx'], function() {
    return gulp.src(config.documentation.lint.js)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('docs_watch', [
    'docs_jsx',
    'docs_lint-js',
  ], function() {
    gulp.watch([config.documentation.docs_bundle], ['docs_jsx']);
    gulp.watch([config.documentation.live_examples_bundle], ['docs_jsx']);
    gulp.watch([config.documentation.lint.js], ['docs_lint-js']);
    gulp.watch([config.documentation.css], ['docs_css']);
    gulp.watch([config.documentation.markdown.files], ['docs_markdown']);
    gulp.watch([config.documentation.example.files], ['docs_files']);
  });

};
