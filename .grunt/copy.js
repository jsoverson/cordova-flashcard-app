module.exports = {
  options : {
    cwd : 'www-dev/'
  },
  all : {
    files : {
      "www/" : 'www-dev/**'
    }
  },
  html : {
    files : {
      "www/" : 'www-dev/**/*.html'
    }
  },
  js : {
    files : {
      "www/" : 'www-dev/**/*.js'
    }
  }
};