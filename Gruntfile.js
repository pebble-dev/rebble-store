

module.exports = function(grunt) {
	
	grunt.initConfig({
		clean: ['build/*'],
		copy: {
		  main: {

		    files: [
		      // includes files within path and its sub-directories
		      {expand: true, cwd: 'src', src: ['**', '!**/*.html', '!**/*.css', '!**/*.scss', '**/*.min.css', '**/*.min.js'], dest: 'build/'},
		       ],
		  },
		},
		htmlmin: {
		   dist: {
		      options: {
		         removeComments: true,
		         collapseWhitespace: true
		      },
		      files: [{
		         expand: true,
		         cwd: 'src',
		         src: ['**/*.html'],
		         dest: 'build/'
		      }]
		   }
		},
		sass: {
			dist: {
				files: {
					'src/css/bootstrap.css': 'node_modules/bootstrap/scss/bootstrap.scss',
					'src/css/main.css': 'src/css/main.scss'
				}
			}
 	 },
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'src',
		      src: ['**/*.css', '!**/*.min.css', '!bower_components/**'],
		      dest: 'build',
		      ext: '.css'
		    }]
		  }
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('build', ['clean', 'copy', 'htmlmin', 'sass', 'cssmin']);
}