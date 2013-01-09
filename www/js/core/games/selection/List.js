/*global require, define, _, Backbone*/

define(
  [
    'marionette',
    'core/games/selection/Item',
    'core/controllers/audio'
  ],
  function (Marionette, DefaultSelectionItem, audioController) {
    "use strict";

    var SelectionList = Marionette.CollectionView.extend({

      tagName : 'div',

      className : 'pickable-list',

      itemView : DefaultSelectionItem,

      items : [],

      maxItems : 6,

      constructor : function () {
        Marionette.CompositeView.prototype.constructor.apply(this, arguments);
        this.on("item:added", this._bindItem, this);
        this.on('render', this._onRender, this);
        this.on('close', this._unbindEvents, this);
        this._spliceCollection();
      },

      _bindItem : function (itemView) {
        this.bindTo(itemView, 'pickable:targetClick', this._onTargetFound, this);
        this.bindTo(itemView, 'pickable:click', this._onChildClick, this);
      },

      _spliceCollection : function() {
        var items = _.isFunction(this.items) ? this.items() : this.items;
        items = _.shuffle(items).splice(0,this.maxItems);
        this.collection = new Backbone.Collection(items);
      },

      _onRender : function () {
        this.targetIndex = ~~(Math.random() * this.collection.length);
        var targetChild = this.children[this.collection.at(this.targetIndex).cid];
        targetChild.isTarget = true;
        targetChild.askQuestion();
      },

      _onChildClick : function (childView) {
        if (!childView.isTarget) this.onFailSelect();
      },

      _onTargetFound : function (targetView) {
        _(this.children).each(function (view) {
          if (view !== targetView) view._hide();
        });
        targetView._fullscreen().success();
        require('application').vent.trigger('game:completed');
      },

      _unbindEvents : function () {
        this.unbindAll();
      },

      onFailSelect : function () {
        audioController.play('failure');
      }
    });

    return SelectionList;
  });
