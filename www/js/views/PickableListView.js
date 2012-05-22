/*global define,_,Backbone*/

define(['views/PickableItemView'], function (PickableItemView) {
  "use strict";

  var PickableView = Backbone.Marionette.CompositeView.extend({
    tagName : 'div',
    className : 'pickable-list',
    template : '#pickable-list',
    itemView : PickableItemView,
    initialize : function() {
      require('application').vent.on('pickable:targetClick',this.onTargetFound,this);
      require('application').vent.on('pickable:click',this.onChildClick,this);
    },
    onRender : function(){
      this.targetIndex = ~~(Math.random() * this.collection.length);
      var targetChild = this.children[this.collection.at(this.targetIndex).cid];
      targetChild.isTarget = true;
    },
    onChildClick : function(childView) {
      // future use?
    },
    onTargetFound : function(targetView) {
      targetView.positionAbsolute();
      _(this.children).each(function(view) {
        if (view !== targetView) view.hide();
      })
      targetView.fullscreen();
      require('application').vent.trigger('game:completed');
    },
    onClose : function() {
      require('application').vent.off('pickable:targetClick',this.onTargetFound,this);
      require('application').vent.off('pickable:click',this.onChildClick,this);
    }
  });

  return PickableView;
});
