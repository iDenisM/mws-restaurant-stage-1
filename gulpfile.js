let gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize');

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

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'dist' ]);
}

// Move html files from dev to dist
function move() {
  return gulp.src('dev/*.html')
    .pipe(gulp.dest('dist/'));
}

function data() {
  return gulp.src('dev/data/*.json')
    .pipe(gulp.dest('dist/data/'));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.move = move;
exports.data = data;
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, move, data, gulp.parallel(styles, scripts));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);
