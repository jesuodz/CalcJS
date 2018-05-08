const gulp = require('gulp'),
    del = require('del');
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    deploy = require('gulp-gh-pages');

const src = 'app/';
const dist = 'dist/';

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('html', () => {
    return gulp.src(src + 'html/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('css', () => {
    return gulp.src( src + 'stylesheets/*.css')
        .pipe(cleanCSS())
        .pipe(rename('main.css'))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('uglifyjs', () => {

    var scripts = gulp.src( src + 'scripts/*.js')
        .pipe(uglify())
        .pipe(rename('index.js'))
        .pipe(gulp.dest(dist));
    var js_libs = gulp.src( src + '/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(dist));
    
    return (js_libs, scripts)
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', () => {
    return gulp.src(src + 'fonts/**/*')
        .pipe(gulp.dest(dist + 'fonts'))
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('watch', ['browserSync', 'uglifyjs', 'css', 'fonts', 'html'], () => {
    gulp.watch(src + 'stylesheets/*.css', ['css']);
    gulp.watch(
        [src + 'scripts/*.js', src + 'lib/*.js'],
        ['uglifyjs']);
    gulp.watch(src + 'html/*.html', ['html'])
});

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['watch', 'clean']);