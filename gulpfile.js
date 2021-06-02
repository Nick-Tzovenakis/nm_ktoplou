const assetsDev = './assets/';
const gulp = require('gulp');
const cache = require('gulp-cache');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const useref = require('gulp-useref');
const browserSync = require('browser-sync').create();
const del = require('del');


const uglify = require('gulp-uglify'); //optimize js
const gulpIf = require('gulp-if');

const cssnano = require('gulp-cssnano'); //optimize css

const imagemin = require('gulp-imagemin'); //optimize images

// Copy node modules to target
gulp.task('modules', function modules(done) {
    gulp.src(['node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js'])
        .pipe(gulp.dest(assetsDev + 'js/'));

    done();
});

/**
 * Convert sass to css
 * Patterns:
 *      *.scss          match any
 *      **\/*.scss      root folder and any child
 *      !not-me.scss    exclude
 *      *.+(scss|sass)  multiple
 */
gulp.task('sass', function () {
    return gulp.src(assetsDev + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
});

/**
* Inject new sass in the browser
*/
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});

/**
 * Auto convert on save and live-reloading
 */
gulp.task('watch', gulp.parallel(['browserSync', 'sass'], function () {
    gulp.watch('assets/scss/**/*.scss', gulp.series(['sass']));
    gulp.watch('/*.html', browserSync.reload);
    gulp.watch('assets/js/**/*.js', browserSync.reload);
}));

/**
 * Optimizations - js css
 */
gulp.task('useref', function () {
    return gulp.src('/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

/**
 * Optimizations - images
 */
gulp.task('images', function () {
    return gulp.src('assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/images'))
});

/**
 * Copy fonts to dist
 */
gulp.task('fonts', function () {
    return gulp.src('assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'))
});

/**
 * Clean
 */
gulp.task('clean:dist', (done) => {
    del.sync('dist');
    done();
});

/**
 * Clear cache
 */
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});

/**
 * Build
 */
gulp.task('build', gulp.series('sass', 'useref', 'images', 'fonts', function (done) {
    done();
}));


