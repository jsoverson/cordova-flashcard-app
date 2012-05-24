/*global require, cordova, Media, ENV */

require.config({

});

// paulIrish();
window.requestAnimFrame = (function(){
  "use strict";
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
    'trak',
    'VERSION'
  ],function(){
    "use strict";

    var app     = require('application'),
        trak    = require('trak'),
        VERSION = require('VERSION');

    $(document).on("touchmove touchstart touchend", function (e) { e.preventDefault(); });

    $(function () {
      trak.view('alphabet-' + VERSION.toString());
      app.vent.trigger('app:start');
      document.addEventListener("deviceready", onDeviceReady, false);
      document.addEventListener("resume", app.resume, false);
    });

    function onDeviceReady() {
      // Deferring to let UI catch up, if necessary
      setTimeout(hideSplashScreen, 0);
    }

    function hideSplashScreen() {
      cordova.exec(null, null, "SplashScreen", "hide", []);
    }
  }
);

