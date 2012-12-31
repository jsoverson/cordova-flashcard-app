/*global define, Media, Backbone, _*/

define(
  [
    'rewards/balloonGame/BalloonGame',
    'datasource/randomColors'
  ],
  function (BalloonGame, randomColors) {
    

    return {
      balloonGame : function() {
        var colors = new Backbone.Collection(_(randomColors.shuffle()).head(6));
        return new BalloonGame({collection : colors});
      }
    };
  }
);
