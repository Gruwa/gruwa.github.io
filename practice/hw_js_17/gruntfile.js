module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['js/src/*.js'],
                // the location of the resulting JS file
                dest: 'js/dest/script.main.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*!  */\n'
                },
            dist: {
                // the files to concatenate
                src: ['js/dest/script.main.js'],
                // the location of the resulting JS file
                dest: 'js/dest/script.main.min.js'
            }
        },
        concat_css: {
            options: {
              // Task-specific options go here.
            },
            all: {
              src: ["css/src/*.css"],
              dest: "css/dest/style.main.css"
            },
        },
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'css/dest/',
              src: ['*.css', '!*.min.css'],
              dest: 'css/dest/',
              ext: '.main.min.css'
            }]
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin']);
};
