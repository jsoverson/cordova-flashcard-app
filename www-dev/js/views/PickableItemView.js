/*global require, define, document*/

define(['marionette','application','trak'], function (Marionette, app,trak) {
  "use strict";

  var PickableItemView = Marionette.ItemView.extend({
    events : {
      'mousedown .pickable'   : 'onDown',
      'touchstart .pickable'  : 'onDown',
      'mouseup .pickable'     : 'onSelect',
      'touchend .pickable'    : 'onSelect'
    },
    tagName : 'div',
    className : 'pickable-item',
    template : '#pickable-item-template',
    onSelect : function(evt) {
      var app = require('application');
      app.vent.trigger('pickable:click', this);
      this.$el.unbind().removeClass('pressed');
      if (this.isTarget) {
        app.vent.trigger('pickable:targetClick', this);
        this.trigger('targetFound',this);
      } else {
        this.$el.addClass('targetMissed transparent');
      }
    },
    onDown : function(evt) {
      this.$el.addClass('pressed');
    },
    hide : function(){
      this.$el.hide();
    },
    positionAbsolute : function(){
      var oldTop  = this.$el.offset().top,
        oldLeft = this.$el.offset().left;
      this.el.style.position = 'absolute';
      var topPct = ~~(100 * oldTop / document.height),
          leftPct = ~~(100 * oldLeft / document.width);
      this.el.style.top = topPct + '%';
      this.el.style.left = leftPct + '%';
    },
    fullscreen : function() {
      this.$el.addClass('fullscreen');
    }
  });

  return PickableItemView;
});
