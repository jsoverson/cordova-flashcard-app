/*global define, window, alert*/

define(['underscore'], function (_) {
  

  //Start of the shake controller for clearing the drawing canvas on device shake
  //We may want to put in the hooks for ondevicemotion to support devicemotion (android, IOS Safari web)


  var shakeController = {

  currentWatch : null,

    //how often to check
    frequency : 2000,

    //the shake delta
    maxAccelerationDelta : 0.1,

    prevAcceleration : {
      x: null,
      y: null,
      z: null
    },

    startWatching : function(callback) {
      if (navigator.accelerometer) {

        this.currentWatch = navigator.accelerometer.watchAcceleration(_.bind(function (newAcc) {
          var accelerationChange = {};

          if (this.previousAcceleration.x !== null) {
            accelerationChange.x = Math.abs(this.prevAcceleration.x, newAcc.x);
            accelerationChange.y = Math.abs(this.prevAcceleration.y, newAcc.y);
            accelerationChange.z = Math.abs(this.prevAcceleration.z, newAcc.z);
          }

          //Currently checking for all shakes
          //we may want to check for specific deltas on each axis
          //so we can simulate up-down left-right shakes, etc
          if (this.isAccelerationWithinDelta(newAcc)){
            callback();

            //Need to stop and re-start watching
            this.stopWatching();
          }

          //reset with current acceleration readings
          this.setPreviousAcceleration(newAcc);

        },this), this.onError, { frequency: this.frequency });
      }
    },

    isAccelerationWithinDelta : function(acc) {
      var maxDelta = this.maxAccelerationDelta;
      if (acc.x > maxDelta && acc.y > maxDelta && acc.z > maxDelta) {
        return true;
      }
      return false;
    },

    setPreviousAcceleration : function(acc) {
      this.previousAcceleration = {
        x: acc.x,
        y: acc.y,
        z: acc.z
      };
    },

    onError : function() {
      console.log(arguments);
      alert("error");
    },

    stopWatching : function() {
      if (navigator.accelerometer && this.currentWatch) {
        navigator.accelerometer.clearWatch(this.currentWatch);
      }
    }

  };

  return shakeController;
});
