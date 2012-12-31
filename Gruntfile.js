/*global module:false*/

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    requirejs : require('./.grunt/requirejs'),
    watch     : require('./.grunt/watch'),
    jshint    : require('./.grunt/jshint'),
    uglify    : require('./.grunt/uglify'),
    strip     : require('./.grunt/strip'),
    open      : require('./.grunt/open'),
    copy      : require('./.grunt/copy'),
    clean     : {
      dist : ['www']
    }
  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-strip');

  grunt.registerTask('dev', ['clean:temp', 'jshint', 'copy:all', 'watch']);
  grunt.registerTask('build', ['clean', 'copy:all', 'strip', 'requirejs', 'uglify']);

};