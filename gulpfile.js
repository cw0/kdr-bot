// Dependencies
var
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  notify = require('gulp-notify'),
  livereload = require('gulp-livereload');

//Task
gulp.task('default', function () {
  //listen for changes
  livereload.listen();
  //set up nodemon
  nodemon({
    //point to our app script
    script: './bin/www',
    ext: 'js jade'
  }).on('restart', function () {
    gulp.src('app.js')
    .pipe(livereload())
    .pipe(notify('reloading page please wait'));
  });
});
