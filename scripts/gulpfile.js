
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var minify = require('gulp-clean-css');

gulp.task('clean', function (callback) {
  return del(
    ['./build/', '../assets/js/*.min.js', '../assets/css/*.min.css'],
    {force: true},
    callback
  );
});

gulp.task('concat-main', function () {
  return gulp.src([
      './vendor/jquery/dist/jquery.js',
      './semantic/dist/semantic.js',
      './cookie.js'
    ])
    .pipe(concat('script.js', {newLine: ';'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('concat-art', function () {
  // This already depends on the main script
  return gulp.src([
      './vendor/jBox/Source/jBox.js',
      './vendor/firebase/firebase-app.js',
      './vendor/firebase/firebase-auth.js',
      './vendor/firebase/firebase-database.js',
      './article.js'
    ])
    .pipe(concat('article.js', {newLine: ';'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('compress-js', ['concat-main', 'concat-art'], function (cb) {
  return gulp.src(['./build/script.js', './build/article.js', './search.js'])
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
    .pipe(uncss({
      html: ['../_site/*.html', '../_site/**/*.html'],
      ignore: [/^\.jBox-/]
    }))
    .pipe(minify({keepSpecialComments: 1, processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../assets/css/'));
});

gulp.task('default', [
  'clean',
  'concat-main', 'concat-art', 'compress-js',
  'concat-css', 'minify-css'
]);
