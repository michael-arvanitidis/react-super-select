var connect = require('gulp-connect'),
    path = require('path'),
    runSequence = require('run-sequence');

module.exports = function(gulp, config) {

  gulp.task('dev:server', function() {
    connect.server({
      root: config.component.example.dist,
      fallback: path.join(config.component.example.dist, 'index.html'),
      port: 8000,
      livereload: true
    });
  });

  gulp.task('dev', function() {
    runSequence('dev:server',
                'watch');
  });

};
