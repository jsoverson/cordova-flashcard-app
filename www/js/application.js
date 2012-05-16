/*global define*/

define(
  [
    'alphabet',
    'views/PickableListView',
    'views/MainMenu',
    'application/PickableList'
  ],
  function (alphabet, PickableListView, MainMenu, PickableList) {
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
      setTimeout(app.newGame,5000);
    })


    return app;
  }
);
