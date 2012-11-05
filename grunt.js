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
        'www-dev/js/*.js',
        'www-dev/js/animations/*.js',
        'www-dev/js/datasource/*.js',
        'www-dev/js/rewards/*.js',
        'www-dev/js/views/*.js',
        'www-dev/spec/**/*.js']
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
        url : 'http://127.0.0.1:8000/www-dev/'
      },
      build : {
        url : 'http://127.0.0.1:8000/www/'
      }
    },
    clean : {
      folder : "www"
    },
    requirejs :{
      almond  : false,
      wrap : true,
      paths : {},
      appDir  : "www-dev",
      baseUrl : 'js',
      dir: "www",
      mainConfigFile: "www-dev/js/main.js",
      replaceRequireScript: [{
         files: ['www/index.html'],
         module: 'main'
       }],
      locale                     : "en-us",
      optimize                   : "none",
      optimizeCss                : "none",
      inlineText                 : true,
      useStrict                  : false,
      skipPragmas                : false,
      optimizeAllPluginResources : false,
      findNestedDependencies     : true,
      keepBuildDir               : false,
      modules                    : [
        {
          name    : "main"
        }
      ],
      fileExclusionRegExp        : /^\./,
      logLevel                   : 0,
      removeCombined: true,
      preserveLicenseComments    : true
    },

    copy : {
      dist : {
        files : {
          "www/" : "www-dev/**"
        }
      }
    },

    min    : {
      dist: {
        src  : ['<banner:meta.banner>', 'www/js/main.js'],
        dest : 'www/js/main.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('default', 'dev');
  grunt.registerTask('dev', 'lint server open:dev watch');
  grunt.registerTask('build', 'lint clean copy min');
  grunt.registerTask('build-open', 'server open:build watch');

};
