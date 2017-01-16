
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minify = require('gulp-clean-css');

gulp.task('clean', function (callback) {
  return del(
    ['./build/', '../assets/js/*.min.js', '../assets/css/*.min.css'],
    {force: true},
    callback
  );
});

gulp.task('concat-js', function () {
  return gulp.src([
      './vendor/jquery/dist/jquery.js',
      './semantic/dist/semantic.js',
      './vendor/jBox/Source/jBox.js',
      './vendor/firebase/firebase.js',
      './cookie.js'
    ])
    .pipe(concat('script.js', {newLine: ';'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('compress-js', ['concat-js'], function (cb) {
  return gulp.src(['./build/script.js', './postare.js', './search.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../assets/js/'));
});

gulp.task('concat-css', function () {
  return gulp.src([
      './semantic/dist/semantic.css',
      './vendor/jBox/Source/jBox.css',
      './style.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('minify-css', ['concat-css'], function (cb) {
  return gulp.src(['./build/style.css'])
    .pipe(minify({keepSpecialComments: 1, processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../assets/css/'));
});

gulp.task('default', [
  'clean',
  'concat-js', 'compress-js',
  'concat-css', 'minify-css'
]);
