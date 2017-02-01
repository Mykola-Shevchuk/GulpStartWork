var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minCss = require('gulp-clean-css'),
    autoprefixerCss = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    deleteFiles = require('del'),
    imageMin = require('gulp-imagemin'),
    pngQuant = require('imagemin-pngquant'),
    imgCache = require('gulp-cache');

// Робота над CSS

gulp.task('css', function() {
  return gulp.src('app/sass/styles.scss')
  .pipe(sass())
  .pipe(autoprefixerCss(['last 15 versions', '> 1%', 'ie 7', 'ie 8'], {cascade: true}))
  .pipe(minCss())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload( {stream: true} )); // За якими файлами ми будемо слідкувати
});

// Конкатинація файлів в один та їх зжимання

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'
		])
	.pipe(concat('libs.min.js')) // Назва висхідного файлу (файл1 + файл2 = файл 3)
	.pipe(uglify())
	.pipe(gulp.dest('app/js')); // Місце його зберігання
});


// Сервер Browser-sync

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app' // тека з файлами які релодяться
		},
		notify: false // відключаємо будь-які повідомлення з сереверу
	});
});

// Очистка папки Dist

gulp.task('clean', function() {
	return deleteFiles.sync('dist');
});

// Очистка кешу зображень

gulp.task('clearCache', function() {
	return imgCache.clearAll();
});

// Мінімізація зображень

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe( imgCache(imageMin({
		interlaced: true,
		progressive: true,
		svgoPlugin: [{removeViewBox: false}],
		une: [pngQuant()]
	})) )
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css'], function() { // ['browser-sync', 'sass'] виконуємо до запуску watch
  gulp.watch('app/sass/styles.scss', ['css']);
  gulp.watch('app/index.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
});

// Сборка проекту

gulp.task('build', ['clean', 'img', 'css', 'scripts'], function() {

	var buildCss = gulp.src('app/css/*.css')
	.pipe(gulp.dest('dist/css'));

	var copySass = gulp.src('app/sass/**/*')
	.pipe(gulp.dest('dist/sass')); 

	var buildJs = gulp.src('app/js/*.js')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});