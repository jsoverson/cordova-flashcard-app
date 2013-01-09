/*global define */

define(
  [
    'application',
    'core/games/selection/Item'
  ],
  function (app, SelectionItem) {
    "use strict";

    var AlphabetItem = SelectionItem.extend({});

    return AlphabetItem;
  });
