const gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify-es').default,
      concat = require('gulp-concat'),
      minifyCSS = require('gulp-minify-css'),
      gutil = require('gulp-util');

gulp.task('linksSass', () => {
    return gulp.src([
            'src/sass/links.scss',
            'node_modules/notyf/src/notyf.scss',
            'node_modules/notyf/src/_notyf-colors.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('linksStyle.css'))
        .pipe(gulp.dest('web/dist/css'));
});

gulp.task('authSass', () => {
    return gulp.src([
            'src/sass/auth.scss',
            'node_modules/notyf/src/notyf.scss',
            'node_modules/notyf/src/_notyf-colors.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('authStyle.css'))
        .pipe(gulp.dest('web/dist/css'));
});

gulp.task('linksJs', () => {
    return gulp.src([
            'node_modules/notyf/src/notyf.js',
            'web/js/links.js'
        ])
        .pipe(uglify())
        .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat('linksScript.js'))
        .pipe(gulp.dest('web/dist/js'));
});

gulp.task('loginJs', () => {
    return gulp.src([
            'node_modules/notyf/src/notyf.js',
            'web/js/login.js'
        ])
        .pipe(uglify())
        .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat('loginScript.js'))
        .pipe(gulp.dest('web/dist/js'));
});

gulp.task('registerJs', () => {
    return gulp.src([
            'node_modules/notyf/src/notyf.js',
            'web/js/register.js'
        ])
        .pipe(uglify())
        .on('error', (err) => { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(concat('registerScript.js'))
        .pipe(gulp.dest('web/dist/js'));
});

gulp.task('default', () => {
    gulp.run('linksJs', 'loginJs', 'registerJs', 'linksSass', 'authSass');
});

gulp.task('watch', () => {
    gulp.run('default');

    gulp.watch('src/sass/**/*.scss', (evt) => {
        console.log('File ' + evt.path + ' was ' + evt.type + ', running tasks...');
        gulp.run('linksSass', 'authSass');
    });

    gulp.watch('src/js/**/*.js', (evt) => {
        console.log('File ' + evt.path + ' was ' + evt.type + ', running tasks...');
        gulp.run('linksJs', 'loginJs', 'registerJs');
    });

});