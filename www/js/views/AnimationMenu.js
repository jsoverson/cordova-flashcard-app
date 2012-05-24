/*global define, Backbone, _*/

define(['animations'], function (animations) {
  "use strict";

  var MainMenu = Backbone.Marionette.View.extend({
    events : {
      'mousedown .animation'  : 'onSelect',
      'touchstart .animation' : 'onSelect',
      'mouseup .animation'    : 'onUnselect',
      'touchend .animation'   : 'onUnselect'
    },
    tagName : 'div',
    id : 'animation-menu',
//    template : '#animation-menu',
    render : function() {
      var view = this;
      _(animations).each(function(val,key) {
        view.$el.append($('<button>').addClass('animation').data('anim',key).text(key));
      });
      //animations.fireworks();
    },
    onUnselect : function(evt) {
      var target = $(evt.target);
      animations[target.data('anim')]();
    },
    onSelect : function(evt) {

    }
  });

  return MainMenu;
});
