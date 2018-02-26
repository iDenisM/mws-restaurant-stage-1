let gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
      gulp.src('js/*.js'),
      uglify(),
      gulp.dest('js/min')
  ],
  cb
  );
});

gulp.task('default', () => {
  gulp.start('compress');
});
