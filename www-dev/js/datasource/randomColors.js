/*global define, Backbone,_*/

define(['backbone', 'underscore'], function (Backbone, _) {
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
      type : 'color',
      color : ' ', //need this to be aware of color for audio
      hue : ~~(Math.random() * 255)
    });
  });

  return colors;
});
