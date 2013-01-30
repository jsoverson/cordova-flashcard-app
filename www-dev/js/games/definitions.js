/*global define, Media, document, window*/

define(
  [
    'games/alphabet/List',
    'games/number/List'
  ],
  function (AlphabetSelection, NumberSelection) {
    "use strict";

    var GameDefinitions = {

      games : [AlphabetSelection],

      getRandom : function() {
        return this.games[~~(Math.random() * this.games.length)];
      }

    };

    return GameDefinitions;

  });