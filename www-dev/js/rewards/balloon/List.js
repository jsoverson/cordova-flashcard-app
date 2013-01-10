/*global define */

define(
  [
    'application',
    'underscore',
    'core/rewards/selection/List',
    'rewards/balloon/item'
  ],
  function (app, _, SelectionList, BalloonItem) {
    "use strict";

    var BalloonSelection = SelectionList.extend({

      itemView : BalloonItem,

      items : function() {
        var itemArray = [];
        _(50).times(function() {
          itemArray.push({
            type   : 'balloon',
            hue : ~~(Math.random() * 255),
            picked : false
          });
        });
        return itemArray;
      }
    });

    return BalloonSelection;
  });
