/*global define, Media, document, window*/

define(
  [
    'games/alphabet/List',
    'games/number/List'
  ],
  function (AlphabetSelection, NumberSelection) {
    "use strict";

    return {
      AlphabetSelection : AlphabetSelection,
      NumberSelection   : NumberSelection
    };

  });