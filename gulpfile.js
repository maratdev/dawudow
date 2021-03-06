var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		fileinclude    = require('gulp-file-include'),
		gulpRemoveHtml = require('gulp-remove-html'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp');

gulp.task('browser-sync', function() {
	browserSync({
		proxy:"dawudow.loc/app/",
		notify: false
	});
});

gulp.task('sass', ['headersass'], function() {
	return gulp.src('app/sass/**/*.scss')
			.pipe(sass({
				includePaths: bourbon.includePaths
			}).on('error', sass.logError))
			.pipe(rename({suffix: '.min', prefix : ''}))
			.pipe(autoprefixer(['last 15 versions']))
			.pipe(cleanCSS())
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass', function() {
	return gulp.src('app/header.scss')
			.pipe(sass({
				includePaths: bourbon.includePaths
			}).on('error', sass.logError))
			.pipe(rename({suffix: '.min', prefix : ''}))
			.pipe(autoprefixer(['last 15 versions']))
			.pipe(cleanCSS())
			.pipe(gulp.dest('app'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function() {
	return gulp.src([
				'app/libs/jquery/jquery-1.11.2.min.js',
				'app/libs/jquery.nicescroll/jquery.nicescroll.min.js',
				'app/libs/owl-carousel/owl.carousel.min.js',
				'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
				'app/libs/parallax/deploy/jquery.parallax.min.js',
				'app/libs/slides/slides.min.jquery.js'


				//'app/libs/modernizr/modernizr.js'

			])
			.pipe(concat('libs.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
	gulp.watch('app/header.scss', ['headersass']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/libs/**/*.css', ['sass']);
	gulp.watch('app/**/*.php', browserSync.reload);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/img/**/*.jpg', browserSync.reload);
	gulp.watch('app/img/**/*.png', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
			.pipe(cache(imagemin({
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			})))
			.pipe(gulp.dest('dist/img'));
});

gulp.task('buildhtml', function() {
	gulp.src(['app/**/*.html'])
			.pipe(fileinclude({
				prefix: '@@'
			}))
			.pipe(gulpRemoveHtml())
			.pipe(gulp.dest('dist/'));
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

	var buildCss = gulp.src([
		'app/css/fonts.min.css',
		'app/css/main.min.css'
	]).pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'app/.htaccess'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
		'dist/**',
		'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
			.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
