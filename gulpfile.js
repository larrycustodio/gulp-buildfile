/* 
The following tasks are done  automate the build and reloading dev webserver:
- Uglify CSS & JS
- Concatenate Files
*/

const gulp = require("gulp");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const imagemin = require("gulp-imagemin")
const browserSync = require('browser-sync').create();

gulp.task("build:js", () => {
    return gulp.src("src/js/*.js")
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task("build:css", () => {
    return gulp.src("src/css/*.css")
        .pipe(concat('styles.css'))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
})

gulp.task("copy", () => {
    return gulp.src("src/assets/*.png")
        .pipe(gulp.dest("dist/assets"));
})
gulp.task("img", ["copy"], () => {
    return gulp.src("dist/assets/*.png")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/assets/compressed"));
})
gulp.task("watch", () => {
    gulp.watch('./src/css/*.css', ['build:css']);
    gulp.watch('./src/js/*.js', ['build:js']);
    gulp.watch('./src/assets/*.png', ['img']);
})
gulp.task("serve", () => {
    return nodemon({
        script: 'server/index.js',
        env: {
            NODE_ENV: 'development'
        }
    });
})
gulp.task("browser-sync", () => {
    browserSync.init({
        proxy: "localhost:8080/"
    })
})
gulp.task('default', ['build:js', 'build:css', 'copy', 'watch', 'serve','browser-sync']);
module.exports = gulp;