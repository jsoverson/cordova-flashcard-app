/*global define */

define(
  [
    'application',
    'core/games/selection/Item'
  ],
  function (app, SelectionItem) {
    "use strict";

    var AlphabetItem = SelectionItem.extend({

      onQuestion : function(type, item) {
        this.audioController.play(type, item);
      }

    });

    return AlphabetItem;
  });
