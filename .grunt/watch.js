module.exports = {
  scripts : {
    files : '<%= jshint.all %>',
    tasks : ['copy:js','jshint'],
    options : {
      forceWatchMethod:'new',
      rewatch : true,
      interrupt:true
    }
  },
  html : {
    files : [
      'www-dev/**/*.html'
    ],
    tasks : ['copy:html'],
    options : {
      forceWatchMethod:'new',
      rewatch : true,
      interrupt:true
    }
  },
  lint : {
    files : '<%= jshint.all %>',
    tasks : 'jshint',
    options : {
      forceWatchMethod:'new',
      rewatch : true,
      interrupt:true
    }
  }
};