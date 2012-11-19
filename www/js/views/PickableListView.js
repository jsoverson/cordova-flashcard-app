/*global require, define, _, Backbone*/

define([
  'marionette', 'views/PickableItemView', 'controllers/audio'
], function (Marionette, PickableItemView, audioController) {
  "use strict";

  var app;

  var PickableView = Marionette.CompositeView.extend({
    tagName   : 'div',
    className : 'pickable-list',
    template  : '#pickable-list',

    itemView : PickableItemView,

    initialize : function () {
      app = require('application');
      app.vent.on('pickable:targetClick', this.onTargetFound, this);
      app.vent.on('pickable:click', this.onChildClick, this);
    },

    onRender : function () {
      this.targetIndex = ~~(Math.random() * this.collection.length);
      var targetChild = this.children[this.collection.at(this.targetIndex).cid];
      targetChild.isTarget = true;

      //slight lag when starting the first word
      //we should prepare the audio before playing it

      var type = targetChild.model.get('type'),
        item = targetChild.model.get(type).toLowerCase();

      audioController.play(type,item);
    },

    onChildClick : function (childView) {
      if (!childView.isTarget) audioController.play('fail','no');
    },

    onTargetFound : function (targetView) {

      audioController.play('success', 'applause');

      targetView.positionAbsolute();
      _(this.children).each(function (view) {
        if (view !== targetView) view.hide();
      });
      targetView.fullscreen();
      require('application').vent.trigger('game:completed');
    },

    onClose : function () {
      app.vent.off('pickable:targetClick', this.onTargetFound, this);
      app.vent.off('pickable:click', this.onChildClick, this);
    }
  });

  return PickableView;
});
