/*global define */

define(
  [
    'application',
    'underscore',
    'core/games/selection/List',
    'game/alphabet/item'
  ],
  function (app, _, SelectionList, AlphabetItem) {
    "use strict";

    var AlphabetSelection = SelectionList.extend({

      itemView : AlphabetItem,

      items : function() {
        var itemArray = [],
         charCodeStart = 65;
        _(26).times(function(index) {
          var letter = String.fromCharCode(charCodeStart + index);
          itemArray.push({
            type   : 'letter',
            id     : letter,
            letter : letter,
            image : ''
          });
        });
        return itemArray;
      }
    });

    return AlphabetSelection;
  });
