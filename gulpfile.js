/* 
The following tasks are done  automate the build and reloading dev webserver:
- Uglify CSS & JS
- Concatenate Files
*/

const gulp = require("gulp");
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');

gulp.task("build:js",()=>{
    return gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest("dist"))
});

gulp.watch();

//

module.exports = gulp;