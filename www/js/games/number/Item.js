/*global define */

define(
  [
    'application',
    'core/games/selection/Item'
  ],
  function (app, SelectionItem) {
    

    var NumberItem = SelectionItem.extend({

      askQuestion : function () {
        //Ask Question Noop Until We Get Audio Files
      }
    });

    return NumberItem;
  });
