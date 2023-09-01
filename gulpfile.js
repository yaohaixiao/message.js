const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const os = require('os')
const open = require('gulp-open')
const pug = require('gulp-pug')
const less = require('gulp-less')
const LessAutoPrefix = require('less-plugin-autoprefix')
const autoprefixer = new LessAutoPrefix({ browsers: ['last 2 versions'] })
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const run = require('gulp-run')
const watch = require('gulp-watch')

const SOURCE_PATH = ['./utils/**/*.js', './*.js']

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanHtml = () => {
  return gulp
    .src('./docs/**/*.html', {
      allowEmpty: true
    })
    .pipe(clean())
}

const cleanStyle = () => {
  return gulp
    .src('./docs/css/*.css', {
      allowEmpty: true
    })
    .pipe(clean())
}

const cleanScript = () => {
  return gulp
    .src('./docs/js/docs.*.js', {
      allowEmpty: true
    })
    .pipe(clean())
}

const cleanDocs = gulp.parallel(cleanHtml, cleanStyle, cleanScript)

/* ==================== 代码规范校验相关的 gulp 任务 ==================== */
const lint = () => {
  return gulp
    .src(SOURCE_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
}

const check = () => {
  return run('npm run prettier:write').exec()
}

const test = gulp.series(lint, check)

/* ==================== 编译代码的 gulp 任务 ==================== */
const buildSourceStyles = () => {
  return gulp
    .src(['./theme/message.less'], {
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

const minifySourceStyle = () => {
  return gulp
    .src(['./message.css'], {
      allowEmpty: true
    })
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
}

const buildLibStyles = gulp.series(buildSourceStyles, minifySourceStyle)

const buildLibScript = () => {
  return run('npm run build:lib').exec()
}

const buildApi = () => {
  return gulp
    .src(['api/pug/index.pug'])
    .pipe(
      pug({
        verbose: true
      })
    )
    .pipe(gulp.dest('docs'))
}

const buildApiStyle = () => {
  return gulp
    .src(['./api/less/docs.less'])
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoprefixer]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/css'))
}

const minifyApiStyle = () => {
  return gulp
    .src('./docs/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs'))
}

const buildApiStyles = gulp.series(buildApiStyle, minifyApiStyle)

const buildApiScript = () => {
  return run('npm run build:api:script').exec()
}

const buildDocs = gulp.series(
  cleanDocs,
  buildApi,
  buildApiStyles,
  buildApiScript
)

const build = gulp.series(test, cleanDocs, buildDocs)

/* ==================== 文档查看相关的 gulp 任务 ==================== */
const openDocs = () => {
  let browser
  if (os.platform() === 'darwin') {
    browser = os.platform() === 'linux' ? 'google-chrome' : 'google chrome'
  } else {
    browser = os.platform() === 'linux' ? 'google-chrome' : 'chrome'
  }
  return gulp.src('docs/index.html').pipe(
    open({
      app: browser,
      uri: 'http://localhost:8961'
    })
  )
}

const connectDocs = () => {
  return connect.server({
    root: 'docs',
    port: 8961,
    livereload: true
  })
}

const reload = () => {
  return connect.reload()
}

const start = gulp.series(build, connectDocs, openDocs)

/* ==================== 检测源代码变更相关的 gulp 任务 ==================== */
const watchSource = () => {
  return watch(
    ['src/**/*.(js|less)'],
    gulp.series(lint, buildLibScript, buildLibStyles)
  )
}

const watchApi = () => {
  return watch(['api/**/*.*'], gulp.series(buildDocs))
}

const watchDocs = () => {
  return watch('docs/**/*.*', {
    ignoreInitial: false
  }).pipe(reload())
}

const watchAll = gulp.parallel(watchSource, watchApi, watchDocs)

// 导出公共方法
module.exports.start = start
module.exports.clean = cleanDocs
module.exports.buildLibStyles = buildLibStyles
module.exports.buildApiStyles = buildApiStyles
module.exports.build = build
module.exports.lint = lint
module.exports.check = check
module.exports.test = test
module.exports.watch = watchAll
