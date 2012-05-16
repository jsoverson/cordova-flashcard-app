/*global require*/

require.config({

});

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
    $('#loading').hide();
    app.mainMenu();
    document.addEventListener("deviceready", onDeviceReady, false);
  });

  function onDeviceReady() {
    var my_media = new Media('audio/welcome.m4a',
      function() {console.log("playAudio():Audio Success");},
      function(err) {console.log("playAudio():Audio Error: "+err);}
    );
    my_media.play();
  }
})

