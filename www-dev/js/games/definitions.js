/*global define, Media, document, window*/

define(
  [
    'games/alphabet/List'
  ],
  function (AlphabetSelection) {
    "use strict";

    var GameDefinitions = {

      games : [AlphabetSelection],

      getRandom : function() {
        return this.games[~~(Math.random() * this.games.length)];
      }

    };

    return GameDefinitions;

  });