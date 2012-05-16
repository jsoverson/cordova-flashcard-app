/*global define*/

define([], function () {
  "use strict";

  var PickableItemView = Backbone.Marionette.ItemView.extend({
    events : {
      click     : 'onClick',
      mousedown : 'onSelect',
      touchstart : 'onSelect',
      mouseup    : 'onUnselect',
      touchend   : 'onUnselect'
    },
    tagName : 'div',
    className : 'pickable-item',
    template : '#pickable-item-template',
    onClick : function(evt) {
      evt.preventDefault();
    },
    onUnselect : function(evt) {
      this.$el.removeClass('pressed');
      if (this.isTarget) {
        this.trigger('targetFound',this);
      } else {
        this.$el.addClass('targetMissed');
      }
      evt.preventDefault();
    },
    onSelect : function(evt) {
      this.$el.addClass('pressed')
      evt.preventDefault();
    },
    hide : function(){
      this.$el.hide();
    },
    fullscreen : function() {
      var oldTop  = this.$el.position().top,
          oldLeft = this.$el.position().left;
      this.$el.css('position','absolute');
      this.$el.css('top',oldTop);
      this.$el.css('left',oldLeft);
      this.$el.animate({
        top : '0',
        left : '0',
        width : document.width,
        height : document.height
      })
    }
  });

  return PickableItemView;
});
