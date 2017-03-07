
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

gulp.task('concat-cat', function () {
  // This already depends on the main script
  return gulp.src([
      './vendor/jBox/Source/jBox.js',
      './vendor/lightslider/dist/js/lightslider.js',
      './category.js'
    ])
    .pipe(concat('category.js', {newLine: ';'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('concat-art', function () {
  // This already depends on the main script
  return gulp.src([
      './vendor/jBox/Source/jBox.js',
      './vendor/lightslider/dist/js/lightslider.js',
      './vendor/firebase/firebase-app.js',
      './vendor/firebase/firebase-auth.js',
      './vendor/firebase/firebase-database.js',
      './article.js'
    ])
    .pipe(concat('article.js', {newLine: ';'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('concat-rea', function () {
  // This already depends on the main script
  return gulp.src([
      './vendor/firebase/firebase-app.js',
      './vendor/firebase/firebase-auth.js',
      './vendor/firebase/firebase-database.js',
      './reactions.js'
    ])
    .pipe(concat('reactions.js', {newLine: ';'}))
    .pipe(gulp.dest('./build'));
});

var js_list = ['concat-main', 'concat-cat', 'concat-art', 'concat-rea']

gulp.task('compress-js', js_list, function (cb) {
  return gulp.src([
      './build/script.js',
      './build/category.js',
      './build/article.js',
      './build/reactions.js',
      './search.js'
    ])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../assets/js/'));
});

gulp.task('concat-css', function () {
  return gulp.src([
      './semantic/dist/semantic.css',
      './vendor/jBox/Source/jBox.css',
      './vendor/lightslider/dist/css/lightslider.css',
      './style.css'
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('minify-css', ['concat-css'], function (cb) {
  return gulp.src(['./build/style.css'])
    .pipe(uncss({
      html: ['../_site/*.html', '../_site/**/*.html'],
      ignore: [/^\.jBox-/, /^\.lightSlider/, /^\.lSSlide/, /^\.lSAction/]
    }))
    .pipe(minify({keepSpecialComments: 1, processImport: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../assets/css/'));
});

gulp.task('js', js_list);

gulp.task('default', [
  'clean',
  'concat-main', 'concat-cat', 'concat-art', 'concat-rea', 'compress-js',
  'concat-css', 'minify-css'
]);
