const { src, dest, watch} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

function javascript() {
    return src('src/js/*.js')
        .pipe(concat('index.js'))
        // The gulp-uglify plugin won't update the filename
        .pipe(uglify())
        // So use gulp-rename to change the extension
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/'));
}

function css() {
    return src('./src/css/*.css')
        .pipe(concatCss("index.css"))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
}


exports.default = function() {
    // You can use a single task
    watch('src/css/*.css', css);
    // Or a composed task
    watch('src/js/*.js', javascript);
};
