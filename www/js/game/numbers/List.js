/*global define */

define(
  [
    'application',
    'underscore',
    'core/games/selection/List',
    'game/numbers/item'
  ],
  function (app, _, SelectionList, NumberItem) {
    "use strict";

    var NumberSelection = SelectionList.extend({

      countTo : 10,

      itemView : NumberItem,

      items : function() {
        var itemArray = [];

        _(this.countTo).times(function(number) {
          itemArray.push({
            type   : 'number',
            id     : number,
            number : number,
            image  : ''
          });
        });
        return itemArray;
      }
    });

    return NumberSelection;
  });
