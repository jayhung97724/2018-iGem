const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const paths = {
  src: {
    css: './src/css/*.css',
    js: './src/js/*.js',
    pug: './src/pug/*.pug',
    images: './src/img/*'
  },
  dist: {
    html: './dist',
    css: './dist/style',
    js: './dist/js',
    images: './dist/img',
    font: './dist/font'
  }
};

gulp.task('pug', () => {
  gulp.src(paths.src.pug)
    .pipe($.pug())
    .pipe(gulp.dest('./dist'));
})

gulp.task('css', () => {
  gulp.src(paths.src.css)
    .pipe(gulp.dest(paths.dist.css))
})

gulp.task('scripts', () => {
  gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.dist.js))
    // .pipe($.uglify())
})

gulp.task('images', () => {
  gulp.src(paths.src.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dist.images))
})

gulp.task('webserver', () => {
  gulp
    .src(paths.dist.html)
    .pipe($.webserver({
      port: 8080,
      livereload: true,
      directoryListing: false
    }))
})

gulp.task('watch', () => {
  gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.css, ['css'])
  gulp.watch(paths.src.js, ['scripts'])
})

gulp.task('default', ['pug', 'css', 'scripts', 'webserver', 'watch'])