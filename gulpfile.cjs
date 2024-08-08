const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    return src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./src/styles/css'))
}

function watchTask() {
    watch('./src/scss/**/*.scss', buildStyles)
}

exports.default = series(buildStyles, watchTask)