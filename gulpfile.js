var gulp = require('gulp'),
    shell = require('gulp-shell')

gulp.task('default', () => {
    console.log('Hello, gulp.')
})

gulp.task('git:pull', shell.task(
    "git pull origin master"
))

gulp.task('install:front', [ 'git:pull' ], shell.task(
    "cd front && npm ci"
))

gulp.task('install:back', [ 'git:pull' ], shell.task(
    "cd back && npm ci"
))

gulp.task('build', [ 'install' ], shell.task(
    "cd front && npm run build"
))

gulp.task('publish', [ 'build' ], shell.task(
    "cp -r front/build /var/www/html/photo-gallery/front"
))
