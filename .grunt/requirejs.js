module.exports = {
  requirejs :{
    almond  : true,
    wrap : true,
    paths : {},
    appDir  : "www-dev",
    baseUrl : 'js',
    dir: "www",
    mainConfigFile: "www/js/main.js",
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
  }
};