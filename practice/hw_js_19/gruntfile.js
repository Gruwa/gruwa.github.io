module.exports = function(grunt) {
      grunt.initConfig({
          sass: {
              dist: {
                  files: [{
                      expand: true,
                      cwd: 'css/src',
                      src: ['style.scss'],
                      dest: 'css/dest',
                      ext: '.css'
                  }]
              }
          },
          cssmin: {
              dest: {
                src: ['css/dest/style.css'],
                dest: 'css/dest/style.min.css'
              }
          },
          concat: {
              options: {
                    separator: ';',
                },
              dest: {
                src: ['js/src/*.js'],
                dest: 'js/dest/script.js'
              }
          },
          babel: {
              options: {
                    sourceMap: true,
                    presets: ['es2015']
                },
                dest: {
                    src: ['js/dest/script.js'],
                    dest: 'js/dest/script.b.js'
                }
          },
          uglify: {
              dest: {
                src: ['js/dest/script.b.js'],
                dest: 'js/dest/script.min.js'
              }
          },
          watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['css/src/*.scss'],
                tasks: ['sass']
            },
            cssmin: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['css/dest/style.css'],
                tasks: ['cssmin']
            },
            concat: {
                 // We watch and compile sass files as normal but don't live reload here
                 files: ['js/src/*.js'],
                 tasks: ['concat']
            },
            babel: {
                 // We watch and compile sass files as normal but don't live reload here
                 files: ['js/src/script.js'],
                 tasks: ['babel']
            },
            uglify: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['js/dest/script.js'],
                tasks: ['uglify']
            }
         }
      });
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-babel');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.registerTask('default', ['sass','cssmin','concat', 'babel', 'uglify', 'watch']);
};
