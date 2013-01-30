/*global define, window*/

define(['underscore'], function (_) {
  "use strict";

  //Start of the shake controller for clearing the drawing canvas on device shake
  //We may want to put in the hooks for ondevicemotion to support devicemotion (android, IOS Safari web)

  var shakeController = {

    currentWatch : null,

    //how often to check
    frequency : 1000,

    //the shake delta
    maxAccelerationDelta : 0.3,

    previousAcceleration : {
      x: null,
      y: null,
      z: null
    },

    startWatching : function(callback) {
      if (navigator.accelerometer) {

        this.currentWatch = navigator.accelerometer.watchAcceleration(_.bind(function (newAcceleration) {
          var accelerationChange = {};
          var maxDelta = this.maxAccelerationDelta;

          if (this.previousAcceleration.x !== null) {

            accelerationChange.x = Math.abs(this.previousAcceleration.x, newAcceleration.x);
            accelerationChange.y = Math.abs(this.previousAcceleration.y, newAcceleration.y);
            accelerationChange.z = Math.abs(this.previousAcceleration.z, newAcceleration.z);
          }

          //Currently checking for all shakes
          //we may want to check for specific deltas on each axis
          //so we can simulate up-down left-right shakes, etc
          if (accelerationChange.x > maxDelta
            && accelerationChange.y > maxDelta
            && accelerationChange.z > maxDelta) {
            callback();
          }

          //reset with current acceleration readings
          this.setPreviousAcceleration(newAcceleration);
          //Need to stop and re-start watching
          this.stopWatching();

        },this), this.onError, { frequency: this.frequency });
      }
    },

    setPreviousAcceleration : function(acceleration) {
      this.previousAcceleration = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
      }
    },

    onError : function() {
      console.log(arguments);
      alert("error");
    },

    stopWatching : function() {
      if (navigator.accelerometer) {
        navigator.accelerometer.clearWatch(this.currentWatch);
      }
    }

  };

  return shakeController;
});
