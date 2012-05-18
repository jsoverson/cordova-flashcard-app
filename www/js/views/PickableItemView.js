/*global define*/

define([], function () {
  "use strict";

  var PickableItemView = Backbone.Marionette.ItemView.extend({
    events : {
      mousedown : 'onSelect',
      touchstart : 'onSelect',
      mouseup    : 'onUnselect',
      touchend   : 'onUnselect'
    },
    tagName : 'div',
    className : 'pickable-item',
    template : '#pickable-item-template',
    onUnselect : function(evt) {
      this.$el.unbind();
      this.$el.removeClass('pressed');
      if (this.isTarget) {
        this.trigger('targetFound',this);
      } else {
        this.$el.addClass('targetMissed transparent');
      }
    },
    onSelect : function(evt) {
      this.$el.addClass('pressed')
    },
    hide : function(){
      this.$el.hide();
    },
    positionAbsolute : function(){
      var oldTop  = this.$el.position().top,
        oldLeft = this.$el.position().left;
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
