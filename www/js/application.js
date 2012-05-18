/*global define*/

define(
  [
    'alphabet',
    'views/PickableListView',
    'views/MainMenu',
    'views/AnimationMenu',
    'application/PickableList',
    'animations'
  ],
  function (alphabet, PickableListView, MainMenu, AnimationMenu, PickableList,animations) {
    "use strict";

    var app = new Backbone.Marionette.Application();

    app.addRegions({
      main : '#content'
    });

    app.mainMenu = function() {
      app.main.show(new MainMenu());
    }

    app.animationsMenu = function() {
      app.main.show(new AnimationMenu());
    }

    app.newGame = function(){
      var gameList = new PickableList(
        _(alphabet.shuffle()).head(6)
      );

      var gameField = new PickableListView({
        collection : gameList
      });
      app.main.show(gameField);
    }

    app.vent.on('game:completed',function(){
      var animation;
      if (Math.random() > .5) {
        animation = animations.fireworks;
      } else {
        animation = animations.starburst;
      }
      setTimeout(animation,500);
      setTimeout(app.newGame,6500);
    })

    return app;
  }
);
