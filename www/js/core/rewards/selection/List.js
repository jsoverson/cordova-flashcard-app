/*global require, define, _, Backbone*/

define(
  [
    'marionette',
    'core/rewards/selection/Item'
  ],
  function (Marionette, DefaultSelectionItem) {
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
        this.on('render', this.onRender, this);
        this.on('close', this._unbindEvents, this);
        this._spliceCollection();
      },

      _bindItem : function (itemView) {
        this.bindTo(itemView, 'pickable:click', this._onChildClick, this);
        this.bindTo(itemView, 'reward:complete', this._onRewardComplete, this);
      },

      _spliceCollection : function() {
        var items = _.isFunction(this.items) ? this.items() : this.items;
        items = _.shuffle(items).splice(0,this.maxItems);
        this.collection = new Backbone.Collection(items);
      },

      _onChildClick : function(childView) {
        childView.model.set('picked', true);
        var notPicked = this.collection.filter(function(item) {
          return item.get("picked") === false;
        });
        if (notPicked.length === 0) this._onRewardComplete();
      },

      _onRewardComplete : function () {
        require('application').vent.trigger('game:new');
      },

      _unbindEvents : function () {
        this.unbindAll();
      }

    });

    return SelectionList;
  });
