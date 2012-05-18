/*global define*/

define([], function () {
  "use strict";

  return {
    length : function(vec) {
      return Math.abs(Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]));
    },
    fromAngle : function(angle, length) {
      return [length * Math.cos(angle), length * Math.sin(angle)];
    },
    getAngle : function(vec) {
      var ratio = 0, offset = 0, x = vec[0], y = vec[1];
      if (x > 0) {
        if (y > 0) {
          offset = 0;
          ratio = y / x;
        } else {
          offset = (3 * Math.PI)/2;
          ratio = x / y;
        }
      } else {
        if (y > 0) {
          offset = Math.PI / 2;
          ratio = x / y;
        } else {
          offset = Math.PI;
          ratio = y / x;
        }
      }
      var angle = Math.atan(Math.abs(ratio)) + offset;
      return angle;
    },
    getAngleDegrees : function(angle) {
      return angle * 180 / Math.PI;
    }
  }
});
