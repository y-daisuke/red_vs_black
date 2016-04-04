var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var merge = require('event-stream').merge;
var watch = require('gulp-watch');
var browserSync = require("browser-sync");

gulp.task('ts:compile', function() {

    //出力オプション
    var typescriptProject = typescript.createProject({
         sortOutput: true,       
    });

    var tsResult = gulp.src([
            './dev/ts/*.ts',
            '!./node_modules/**'//node_modules配下は除外する
          ])
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(typescript(typescriptProject))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/js'));
    tsResult.pipe(babel());
});

gulp.task('br:sync',function(){
    browserSync({
        server: {
            baseDir: "./www" // ルートとなるディレクトリを指定
        }
    });
    browserSync.reload();   // ファイルに変更があれば同期しているブラウザをリロード
    
});

gulp.task('ts:watch', function() { 
    gulp.watch('./dev/ts/*.ts', function() {
    gulp.run('ts:compile');
  });
});

gulp.task('br:watch', function() { 

    gulp.watch("./www/**", function() {
        gulp.run('br:sync');
    });
    
});

gulp.task('default',function(){
    gulp.run(['ts:watch','br:watch']);
})