/*global define*/

define(['views/PickableItemView'], function (PickableItemView) {
  "use strict";

  var PickableView = Backbone.Marionette.CompositeView.extend({
    tagName : 'div',
    className : 'pickable-list',
    template : '#pickable-list',
    itemView : PickableItemView,
    initialize : function() {
    },
    onRender : function(){
      this.targetIndex = ~~(Math.random() * this.collection.length);
      var targetChild = this.children[this.collection.at(this.targetIndex).cid];
      targetChild.isTarget = true;
      targetChild.$el.css({'background':'blue'})
      targetChild.on('targetFound',this.onTargetFound,this);
    },
    onTargetFound : function(targetView) {
      targetView.fullscreen();
      _(this.children).each(function(view,index) {
        if (view !== targetView) view.remove();
      })
      require('application').vent.trigger('game:completed');
    }
  });

  return PickableView;
});
