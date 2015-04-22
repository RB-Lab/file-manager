var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var bulkSass = require('gulp-sass-bulk-import');
var config = require('../config.js').sass;

gulp.task('styles', function() {
	gulp.src(config.src)
		.pipe(bulkSass())
		.pipe(sass(config.settings))
		.pipe(gulp.dest(config.dest))
		.pipe(connect.reload());
});
