import gulp from 'gulp';
const { series, parallel, src, dest, task } = gulp;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';
import imagemin from 'gulp-imagemin';
import { deleteAsync } from 'del';
import terser from 'gulp-terser';


task('css', function(){
    console.log('minifying css....');
    src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest('./assets.css'));

    return src('./assets/**/*.css')
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge:true
    }))
    .pipe(dest('./public/assets'));
});

task('js',function(){
    console.log('minifying js..');
   return src('./assets/**/*.js')
    .pipe(terser())
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'));
});

task('images',function(){
    console.log('compressing images...');
    return src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'));
});

//empty the public/assets directory
task('clean:assets',function(){
   return deleteAsync('./public/assets');
});


//executing the tasks in one go and make deployment ready
task('build', series('clean:assets','css','js','images'), function(done){
    console.log('Building assets');
    done();
});