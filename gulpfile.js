const gulp = require('gulp');
const ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');


// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init({identityMap: true}))
    .pipe(tsProject());
    
  return tsResult.js.pipe(sourcemaps.write({includeContent: false, sourceRoot: "../src/"})).pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);