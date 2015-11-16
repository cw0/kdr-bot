// Dependencies
var
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  notify = require('gulp-notify'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  source = require('vinyl-source-stream'),
  livereload = require('gulp-livereload');

//watch jsx files for changes. If found run js task
gulp.task('watch', function() {
  gulp.watch("public/javascripts/src/**/*.jsx", ["js"]); //TODO Update to react directory
});

//build jsx
gulp.task('js', function(){
  browserify('./public/javascripts/src/app.jsx') //TODO Update to react directory
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/javascripts/build/'))
    .pipe(notify('building jsx files'));
});

//livereload task
gulp.task('livereload', function () {
  //listen for changes
  livereload.listen();
  //set up nodemon
  nodemon({
    //point to our app script
    script: './bin/www',
    ext: 'js'
  }).on('restart', function () {
    gulp.src('app.js')
    .pipe(livereload())
    .pipe(notify('reloading page please wait'));
  });
});

gulp.task('default', ['watch', 'js', 'livereload']);
