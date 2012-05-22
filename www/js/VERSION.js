/*global define*/

define([], function () {
  "use strict";

  return {
    major : 0,
    minor : 5,
    patch : 0,
    toString : function() {
      return [this.major,this.minor,this.patch].join('.');
    }
  }
});
