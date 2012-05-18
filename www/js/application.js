/*global define*/

define(
  [
    'alphabet',
    'views/PickableListView',
    'views/MainMenu',
    'application/PickableList',
    'animations'
  ],
  function (alphabet, PickableListView, MainMenu, PickableList,animations) {
    "use strict";

    var app = new Backbone.Marionette.Application();

    app.addRegions({
      main : '#content'
    });

    app.mainMenu = function() {
      app.main.show(new MainMenu());
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
      animations.fireworks();
      setTimeout(app.newGame,6500);
    })

    return app;
  }
);
