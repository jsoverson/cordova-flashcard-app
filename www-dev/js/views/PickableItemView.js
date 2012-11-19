/*global require, define, document*/

define(['marionette', 'application', 'trak', 'controllers/audio'],
  function (Marionette, app, trak, audioController) {
    "use strict";

    var PickableItemView = Marionette.ItemView.extend({
      events    : {
        'mousedown .pickable'  : 'onDown',
        'touchstart .pickable' : 'onDown',
        'mouseup .pickable'    : 'onSelect',
        'touchend .pickable'   : 'onSelect'
      },
      tagName   : 'div',
      className : 'pickable-item',
      template  : '#pickable-item-template',

      onSelect : function (evt) {
        var app = require('application');

        app.vent.trigger('pickable:click', this);
        this.$el.unbind().removeClass('pressed');

        if (this.isTarget) {
          app.vent.trigger('pickable:targetClick', this);
          this.trigger('targetFound', this);
        } else {
          this.$el.addClass('targetMissed transparent');
        }
      },

      onDown : function (evt) {
        this.$el.addClass('pressed');
      },

      hide : function () {
        this.$el.hide();
      },

      success : function () {
        this.el.style.position = 'absolute';
        audioController.play('success', 'applause');
      },

      fullscreen : function () {
        this.$el.addClass('fullscreen');
      }
    });

    return PickableItemView;
  });
