/*global require, cordova, Media, ENV */

require.config({

  locale : 'en_US',
  paths  : {
    'jquery'     : 'vendor/jquery-1.7.1.min',
    'underscore' : 'vendor/underscore',
    'backbone'   : 'vendor/backbone',
    'marionette' : 'vendor/backbone.marionette'
  },

  shim : {
    'underscore' : {
      exports : '_'
    },
    'backbone'   : {
      deps    : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    'marionette' : {
      deps    : ['backbone'],
      exports : 'Marionette'
    }
  }

});

// paulIrish();
window.requestAnimFrame = (function () {
  "use strict";
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

require(['application', 'trak', 'VERSION'],
  function (app, trak, VERSION) {
    "use strict";

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

