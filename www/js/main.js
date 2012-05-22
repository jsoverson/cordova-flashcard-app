/* global require, Media, cordova, ENV */

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
    'vendor/order!application',
    'VERSION',
    'trak'
  ],function(){
    "use strict";

    var app   = require('application'),
      trak    = require('trak'),
      VERSION = require('VERSION');

    $(document).on("touchmove touchstart touchend", function (e) { e.preventDefault(); });
    $(document).on("resize", recordOrientation);

    function recordOrientation() {
      if (document.width > document.height) {
        trak.event('orientationChange', 'landscape');
      } else {
        trak.event('orientationChange', 'portrait');
      }
    }

    $(function () {
      recordOrientation();
      trak.view('alphabet-' + VERSION.toString());
      trak.event('game', 'start');

      if (document.location.search.match(/anim/)) {
        app.animationMenu();
      } else {
//      app.mainMenu();
        app.newGame();
        document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("resume", app.resume, false);
      }
    });

    function onDeviceReady() {
      setTimeout(function () {cordova.exec(null, null, "SplashScreen", "hide", [])}, 500);
//      var welcome = new Media('', function () {}, function (err) {});
//      welcome.play();
    }
  }
)

