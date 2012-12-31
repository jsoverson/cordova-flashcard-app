/*global define, Media, document, window*/

define(
  [
    'game/alphabet/List',
    'game/numbers/List'
  ],
  function (AlphabetSelection, NumberSelection) {
    "use strict";

    return {
      AlphabetSelection : AlphabetSelection
    };

  });