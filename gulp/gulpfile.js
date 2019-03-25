const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const minifycss = require('gulp-minify-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const gzip = require('gulp-gzip');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

// TODO: Load configs from json
//const config = require('./fe_configs/websites.json');
//function websites(done) {
//  let array = config.websites;
//  console.log(' ');
//  for (let index = 0; index < array.length; index++) {
//    const element = array[index];
//    console.log('      ' + (index + 1) + ') ' + element.name);
//  }
//  console.log(' ');
//  done();
//};
//exports.websites = websites

// Paths for all projects. Create a new contant function per app
const dist = './static/'; // There should only be 1 dist for entire project (not per app)
const websites = new function() {
    this.root = './content_services/websites/';
    this.all = this.root + '**/*.*';
    this.templates = this.root + 'templates/**/*.*';
    this.static = this.root + 'static_files/websites/';
    this.sass = this.static + 'css/';
    this.js = this.static + 'js/';
    this.images = this.static + 'images/';
    this.dist = dist;
};


// Image optimization, minify Images
gulp.task('websites:images', function() {
    return (
        gulp
            .src(websites.images + '**/*.*')
            .pipe(imagemin())
            .pipe(gulp.dest(websites.dist))
    )
});

// Compile Sass
gulp.task('websites:sass', function() {
    return gulp.src(websites.sass + '*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest(websites.dist + 'css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(websites.dist + 'css/'))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest(websites.dist + 'css/'))
});

// Compile js
gulp.task('websites:js', function() {
    return gulp.src(websites.js + '**/*.js', {
                sourcemaps: true
            })
            .pipe(gulp.dest(websites.dist + 'js/'))
            .pipe(terser())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(websites.dist + 'js/'))
});

/* Generic project (non-app specific tasks) below */


// Watch Files For Changes
gulp.task('watch', function() {
    setTimeout(() => {
        browserSync.init({
            proxy: "http://localhost:8000"
        });
    
        gulp.watch(websites.sass + '**/*.scss', gulp.series('websites:sass')).on('change', browserSync.reload);
        gulp.watch(websites.js + '**/*.scss', gulp.series('websites:js')).on('change', browserSync.reload);            
    }, 3000);
});


// Copy 3rd party modules to static
gulp.task('copy_modules', function(done) {
    js_sources = [
      './node_modules/vue/dist/vue.js',
      './node_modules/vue/dist/vue.min.js'
    ]
    gulp.src(js_sources).pipe(gulp.dest(websites.dist + 'js/'));

    // Could also include other sources, i.e. css as needed
    // css_sources = []
    // gulp.src(css_sources).pipe(gulp.dest(websites.dist + 'css/'));

    done()
});


// SASS linting
gulp.task('lint_sass', function () {
  return gulp.src(websites.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// JS linting
gulp.task('lint_js', function() {
  return gulp.src(websites.js).pipe(eslint({
    'rules': {
        'quotes': [1, 'single'],
        'semi': [1, 'always']
    }
  }))
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});



gulp.task('build', gulp.series('websites:js', 'websites:sass', 'copy_modules'));
gulp.task('default', gulp.series('build'));


