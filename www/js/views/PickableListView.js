/*global define,_,Backbone*/

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
      targetChild.on('targetFound',this.onTargetFound,this);
    },
    onTargetFound : function(targetView) {
      console.log('targetFound');
      targetView.positionAbsolute();
      _(this.children).each(function(view) {
        if (view !== targetView) view.hide();
      })
      targetView.fullscreen();
      require('application').vent.trigger('game:completed');
    }
  });

  return PickableView;
});
