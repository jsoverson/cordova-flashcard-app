/*global define, Media*/

define(
  [
    'rewards/balloonGame/BalloonGame',
    'datasource/randomColors'
  ],
  function (BalloonGame, randomColors) {
    "use strict";

    return {
      balloonGame : function() {
        var colors = new Backbone.Collection(_(randomColors.shuffle()).head(6))
        return new BalloonGame({collection : colors});
      }
    }
  }
);
