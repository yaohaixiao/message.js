const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const less = require('gulp-less')
const LessAutoPrefix = require('less-plugin-autoprefix')
const autoprefixer = new LessAutoPrefix({ browsers: ['last 2 versions'] })
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const run = require('gulp-run')

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanStyle = () => {
  return gulp
    .src('./*.min.css', {
      allowEmpty: true
    })
    .pipe(clean())
}

/* ==================== 代码规范校验相关的 gulp 任务 ==================== */
const lint = () => {
  return run('npm run prettier:write').exec()
}

/* ==================== 编译代码的 gulp 任务 ==================== */
const buildStyles = () => {
  return gulp
    .src(['./components/src/message.less'], {
      allowEmpty: true
    })
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoprefixer]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
}

const minifyStyle = () => {
  return gulp
    .src(['./message.css'], {
      allowEmpty: true
    })
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
}

const build = gulp.series(lint, cleanStyle, buildStyles, minifyStyle)

module.exports.clean = cleanStyle
module.exports.lint = lint
module.exports.build = build
