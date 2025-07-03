const { src, dest, series, parallel, watch } = require('gulp');
const sassGlob    = require('gulp-sass-glob');
const sass        = require('gulp-sass')(require('sass'));
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const htmlPartial = require('gulp-html-partial');

const paths = {
    html:      'src/html/pages/*.html',
    partials:  'src/html/partials/',
    scss:      'src/sass/**/*.scss',
    scssClient: 'src/sass/style.scss',
    scssAdmin:    'src/sass/style-admin.scss',
    // Thư mục chứa file JS custom
    customJs:  'src/js/app.js',
    customAdminJs:  'src/js/admin-app.js',
    // Các file vendor bạn cần
    vendorJs: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/flatpickr/dist/flatpickr.min.js',
    ]
};

// --- HTML + partials (như cũ) ---
function html() {
    return src(paths.html)
        .pipe(htmlPartial({ basePath: paths.partials, tag: 'partial' }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// --- Styles (nếu cần quietDeps như trước) ---
function styles() {
    return src(paths.scssClient)
        .pipe(sassGlob())
        .pipe(sass({ quietDeps: true, logger: { warn: () => {} } }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// --- Vendor JS ---
function vendorScripts() {
    return src(paths.vendorJs)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

// --- Custom JS (Browserify + Babelify) ---
function customScripts() {
    return browserify({ entries: 'src/js/app.js', debug: true })
        .transform(babelify, { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// --- Copy assets khác như icons, slick-css (giữ nguyên) ---
function copyIcons() {
    return src('node_modules/bootstrap-icons/font/fonts/*')
        .pipe(dest('dist/css/fonts'));
}
function copySlickCss() {
    return src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/slick-theme.css'
    ])
        .pipe(dest('dist/css/vendor'));
}

// copy loader gif & fonts của slick
function copySlickAssets() {
    // ajax-loader.gif sẽ nằm cùng folder với slick-theme.css
    src('node_modules/slick-carousel/slick/ajax-loader.gif')
        .pipe(dest('dist/css/'));

    // fonts thì vào thư mục fonts/
    return src('node_modules/slick-carousel/slick/fonts/**/*')
        .pipe(dest('dist/css/fonts'));
}

function copyImages() {
    return src('src/img/**/*')   // hoặc ./img/** nếu bạn để ở gốc
        .pipe(dest('dist/img'));
}

function adminStyles() {
    return src(paths.scssAdmin)
        .pipe(sassGlob())
        .pipe(sass({ quietDeps: true, logger: { warn: () => {} } }).on('error', sass.logError))
        .pipe(concat('style-admin.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function customAdminScripts() {
    return browserify({ entries: 'src/js/admin-app.js', debug: true })
        .transform(babelify, { presets: ['@babel/preset-env'] })
        .bundle()
        .pipe(source('admin-app.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// --- Dev server + watch ---
function serve() {
    browserSync.init({ server: 'dist' });
    watch('src/html/partials/**/*.html', html);
    watch('src/img/**/*', copyImages);
    watch(paths.html, html);
    watch(paths.scss, styles);
    watch(paths.scss, adminStyles);
    watch(paths.customJs, customScripts);
    watch('src/js/**/*.js', customScripts);
    watch(paths.customAdminJs, customAdminScripts);
    watch('src/js/**/*.js', customAdminScripts);
}

exports.build = series(
    parallel(
        html,
        styles,
        copyIcons,
        copySlickCss,
        copySlickAssets,
        copyImages,
        vendorScripts,
        customScripts,
        adminStyles,
        customAdminScripts
    )
);
exports.default = series(exports.build, serve);
