/*global define, Backbone,_*/

define([], function () {
  "use strict";

  var Color = Backbone.Model.extend({
    toString : function() {
      return 'hsl(' + this.get('hue') + ',100%,50%)';
    }
  });

  var Colors = Backbone.Collection.extend({model : Color });
  var colors = new Colors();

  _(50).times(function() {
    colors.add({
      hue : ~~(Math.random() * 255)
    });
  });

  return colors;
});
