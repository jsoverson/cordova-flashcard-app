/*global require, define, document*/

define(
  [
    'marionette',
    'underscore',
    'core/controllers/audio'
  ],

  function (Marionette, _,audioController) {
    "use strict";

    var SelectionItem = Marionette.ItemView.extend({

      tagName   : 'div',

      className : 'pickable-item reward',

      template : _.template("<div class='pickable'></div>"),

      audioController : audioController,

      constructor : function() {
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        this._bindEvents();
      },

      _bindEvents : function() {
        this.$el.on('click', _(this.close).bind(this));
        this.$el.on('mousedown','.pickable', _(this._onPress).bind(this));
        this.$el.on('touchstart','.pickable', _(this._onPress).bind(this));
        this.$el.on('mouseup','.pickable', _(this._onSelect).bind(this));
        this.$el.on('touchend','.pickable', _(this._onSelect).bind(this));
      },

      _onPress : function () {
        this.$el.addClass('pressed');
      },

      _onSelect : function () {
        this.trigger('pickable:click', this);
        this.$el.unbind().removeClass('pressed');
        if (this.onSelect && _.isFunction(this.onSelect)) this.onSelect();
      },

      _hide : function () {
        this.$el.hide();
      }

    });

    return SelectionItem;
  });
