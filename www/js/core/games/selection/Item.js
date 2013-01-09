/*global require, define, document*/

define(
  [
    'marionette',
    'underscore',
    'application',
    'core/controllers/audio'
  ],
  function (Marionette, _, app, audioController) {
    "use strict";

    var SelectionItem = Marionette.ItemView.extend({

      tagName : 'div',

      className : 'pickable-item game',

      template : _.template('<div class="pickable">' +
        ' <% if (image) {%><img src="<%=image%>"><% } else { %><span><%= id %></span><% } %> ' +
        '</div>'),

      isTarget : false,

      constructor : function () {
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        this._bindEvents();
      },

      _bindEvents : function () {
        this.$el.on('click', _(this.close).bind(this));
        this.$el.on('mousedown', '.pickable', _(this._onPress).bind(this));
        this.$el.on('touchstart', '.pickable', _(this._onPress).bind(this));
        this.$el.on('mouseup', '.pickable', _(this._onSelect).bind(this));
        this.$el.on('touchend', '.pickable', _(this._onSelect).bind(this));
      },

      _onPress : function () {
        this.$el.addClass('pressed');
      },

      _onSelect : function () {
        this.trigger('pickable:click', this);
        this.$el.unbind().removeClass('pressed');

        if (this.isTarget) {
          this.trigger('pickable:targetClick', this);
        }
        else {
          this.$el.addClass('targetMissed transparent');
        }
      },

      _hide : function () {
        this.$el.hide();
      },

      //Overridable Methods

      success : function () {
        this.el.style.position = 'absolute';
        audioController.play('success', 'applause');
        return this;
      },

      _fullscreen : function () {
        this.$el.addClass('fullscreen');
        return this;
      },

      askQuestion : function () {
        var type = this.model.get('type'),
          item = this.model.get(type);
        item = _.isString(item) ? item.toLowerCase() : item;

        audioController.play(type, item);
        return this;
      }
    });

    return SelectionItem;
  });
