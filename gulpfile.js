let gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin');

let paths = {
  styles: {
    src: 'dev/css/**/*.css',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'dev/js/**/*.js',
    dest: 'dist/js/'
  }
};

// gulp.task('build', build);

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

/*
 * Define default task that can be called by just running `gulp` from cli
 */
// gulp.task('default', build);
