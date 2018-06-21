/**
 * @author HY
 * @create 2018.6.20
 * gulpfile
 */
"use strict";

const env = 'dev';
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// const watchify = require('gulp-watchify');
// const buffer = require('vinyl-buffer');

// const glob = require('glob');

const fpath = {
    'html': '../resources/**/*.php',
    'scripts': ['src/js/!(common|modules|lib|dialog)**/*.js', 'src/js/!(common|modules|lib|dialog)**/**/*.js'],
    'scss': 'src/sass/!(core)*/*.scss',
    'css': 'css/*.css',
    'js': 'js/**/*.js',
    'images': ''
};

gulp.task('dev:style', () => {
    gulp.watch(['src/sass/core/*.scss', 'src/sass/common/**/*.scss'], function(e) {
        compileScss('src/sass/*/*.scss');
        compileScss('src/sass/!(core|common)*/**/*.scss');
    });
    gulp.watch('src/sass/!(core)*/*.scss', function(e) {
        compileScss('src/sass/!(core)*/*.scss');
    });
    gulp.watch('src/sass/!(core|common)*/**/*.scss', function(e) {
        compileScss('src/sass/!(core|common)*/**/*.scss');
    });
});

const compileScss = path => {
    return gulp.src(path)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe($.sourcemaps.write('./.map'))
        .pipe(gulp.dest('./dist/css'));
};

gulp.task('online:style', () => {
    minifyScss('src/sass/!(core)*/*.scss');
    minifyScss('src/sass/!(core|common)*/**/*.scss');
});

const minifyScss = path => {
    return gulp.src(path)
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe(gulp.dest('./dist/css'));
};

// gulp.task('watch:js', watchify(function(watchify) {
//     return gulp.src(fpath['scripts'])
//         .pipe(watchify({
//             watch: true
//         }))
//         .pipe(buffer())
//         .pipe($.babel())
//         .pipe($.sourcemaps.init())
//         // .pipe($.if('*.js', $.uglify()))
//         .pipe($.sourcemaps.write('./.map'))
//         .pipe(gulp.dest('./dist/js'))
// }));

// /*监控依赖非index.js，重新压缩依赖*/
// gulp.task('watch:other', function() {
//     gulp.watch('src/js/@(common|modules|lib|dialog)/*.js', ['watch:js']);
// });

//static resource
const statics = (path) => {
    return gulp.src(path)
        .pipe(gulp.dest('./dist/images'));
};
const component = (path) => {
    return gulp.src(path)
        .pipe(gulp.dest('./dist/component'));
}

gulp.task('dev:static', () => {
    gulp.watch('src/images/**/*.*', () => {
        statics('src/images/**/*.*');
    });
    gulp.watch('src/component/**/*.*', () => {
        component('src/component/**/*.*');
    });
});
gulp.task('online:static', () => {
    statics('src/images/**/*.*');
    component('src/component/**/*.*');
});

//webpack
const webpackConfig = {
    watch: true,
    entry: {
        'index/index': './src/js/index/index.js'
    },
    output: {
        filename: './js/[name].js',
        chunkFilename: env === 'production' ? './js/[name]-[hash].chunk.js' : './js/[name].chunk.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            query: {
                compact: false,
                presets: ['es2015', 'stage-1']
            }
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    }
};
gulp.task('dev:webpack', () => {
    webpackConfig.watch = true;
    return gulp.src('src/**/*.js')
        .pipe($.webpack(webpackConfig))
        .pipe(gulp.dest('dist'));
});
gulp.task('online:webpack', () => {
    webpackConfig.watch = false;
    return gulp.src('src/**/*.js')
        .pipe($.webpack(webpackConfig))
        .pipe($.uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('online', () => {
    gulp.start('online:style', 'online:static');
});

// gulp.task('default', ['watch:js', 'watch:other']);