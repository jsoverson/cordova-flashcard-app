/*global require,*/

require.config({

});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

require(
  [
    'vendor/order!vendor/jquery-1.7.1.min',
    'vendor/order!vendor/underscore',
    'vendor/order!vendor/backbone',
    'vendor/order!vendor/backbone.marionette',
    'vendor/order!application'
  ],function(){
  "use strict";

  var app = require('application');

  $(document).on("touchmove touchstart touchend", function (e) { e.preventDefault(); });

  $(function () {
    if (document.location.search.match(/anim/)) {
      app.animationMenu();
    } else {
      $('#loading').hide();
      //app.mainMenu();
      app.newGame();
      document.addEventListener("deviceready", onDeviceReady, false);
      document.addEventListener("pause", app.mainMenu, false);
    }
  });

  function onDeviceReady() {
    setTimeout(function(){cordova.exec(null, null, "SplashScreen", "hide", [])},500);
    return;
    var welcome = new Media('',function() {},function(err) {});
    //welcome.play();
  }
})

