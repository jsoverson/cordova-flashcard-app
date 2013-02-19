/*global define */

define(
  [
    'application',
    'underscore',
    'core/games/selection/List',
    'games/alphabet/item'
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
      },

      onSuccessSelect: function() {
        this.audioController.play('success', 'applause');
        require('application').vent.trigger('game:completed');
      },

      onFailSelect : function() {
        this.audioController.play('failure',this.getRandomFailureSound());
      }
    });

    return AlphabetSelection;
  });
