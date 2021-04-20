module.exports = function (grunt) {
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dev: {
				files: {
					'public/bundle.js': ['client/index.jsx']
				},
				options: {
					transform: [
						'babelify', 'reactify'
					]
				},
			}
		},
		watch: {
			src: {
				files: ['client/**/*.js', 'client/**/*.jsx'],
				tasks: ['browserify:dev'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('start:dev', ['browserify', 'watch']);

	grunt.registerTask('default', 'browserify');
};
