module.exports = function(grunt) {
      grunt.initConfig({
          sass: {
              dist: {
                  files: [{
                      expand: true,
                      cwd: 'style/src',
                      src: ['style.scss'],
                      dest: 'style/dest',
                      ext: '.css'
                  }]
              }
          },
          cssmin: {
              dest: {
                src: ['style/dest/style.css'],
                dest: 'style/dest/style.min.css'
              }
          }
      });
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-concat-css');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.registerTask('default', ['sass','cssmin']);
};
