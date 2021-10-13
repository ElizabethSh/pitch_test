const {src, dest, series, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;

function html() {
  return src('src/**.html')
    .pipe(htmlmin({ 
      collapseWhitespace: true 
    }))
    .pipe(dest('dist'))
};

function scss() {
  return src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(sync.stream());
};

function clear() {
  return del('dist')
};

function images() {
  return src('src/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(dest('dist/img'))
};

function scripts() {
  return src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(sync.stream());
};

function copy() {
  return src([
    'src/fonts/*.{woff2,woff}',
    'src/img/**/*.{jpg,png,svg}',
    'src/*.ico'
  ],
  {
    base: 'src'
  })
  .pipe(dest('dist'));
};

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload);
  watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload);
  watch('src/js/*.js', series(scripts)).on('change', sync.reload);
};

exports.build = series(clear, parallel(scss, html, scripts, copy, images));
exports.default = series(clear, parallel(scss, html, scripts, copy, images), series(serve));
