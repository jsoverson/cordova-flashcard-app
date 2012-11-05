module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg    : '<json:package.json>',
    meta   : {
      banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    lint   : {
      files : [
        'grunt.js',
        'js/*.js',
        'js/animations/*.js',
        'js/datasource/*.js',
        'js/rewards/*.js',
        'js/views/*.js',
        'spec/**/*.js']
    },
    watch  : {
      lint : {
        files : ['<config:lint.files>'],
        tasks : 'jshint'
      }
    },
    jshint : {
      options : {
        curly   : false,
        eqeqeq  : true,
        immed   : true,
        latedef : true,
        newcap  : true,
        noarg   : true,
        sub     : true,
        undef   : true,
        boss    : true,
        eqnull  : true,
        node    : true,
        es5     : true
      },
      globals : {
        jasmine    : false,
        describe   : false,
        beforeEach : false,
        expect     : false,
        it         : false,
        spyOn      : false
      }
    },
    open   : {
      dev : {
        url : 'http://127.0.0.1:8000/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', 'dev');
  grunt.registerTask('dev', 'server open:dev watch');

};