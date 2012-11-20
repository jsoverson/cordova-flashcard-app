/*global define, Backbone, _*/

define(
  [
    'zepto',
    'marionette',
    'underscore',
    'animations'
  ],
  function ($, Marionette, _, animations) {
    "use strict";

    var MainMenu = Marionette.ItemView.extend({

      tagName : 'div',

      id : 'animation-menu',

      events : {
        'mousedown .animation'  : 'onSelect',
        'touchstart .animation' : 'onSelect',
        'mouseup .animation'    : 'onUnselect',
        'touchend .animation'   : 'onUnselect'
      },

      render     : function () {
        var view = this;
        _(animations).each(function (val, key) {
          view.$el.append($('<button>').addClass('animation').data('anim', key).text(key));
        });
        //animations.fireworks();
      },

      onUnselect : function (evt) {
        var target = $(evt.target);
        animations[target.data('anim')]();
      },

      onSelect   : function (evt) {}
    });

    return MainMenu;
  });
