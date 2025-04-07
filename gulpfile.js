const { src, dest, watch, series, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')

// SCSS
function buildStyles() {
    return src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('css'))
}

// JS
function buildScripts() {
    return src('./src/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('js'))
}

// Watch
function watchTask() {
    watch('./src/scss/**/*.scss', buildStyles)
    watch('./src/js/**/*.js', buildScripts)
}

exports.default = series(
    parallel(buildStyles, buildScripts),
    watchTask
)

// Suprime o warning do fs.Stats (DEP0180)
process.removeAllListeners('warning');
process.on('warning', (e) => {
  if (e.name === 'DeprecationWarning' && e.code === 'DEP0180') return;
  console.warn(e);
});
