/*global define, Backbone*/

define(
  [
    'marionette',
    'Trak',
    'datasource/alphabet',
    'views/PickableListView',
    'views/MainMenu',
    'views/AnimationMenu',
    'animations',
    'rewards'
  ],
  function (Marionette, trak, datasource, PickableListView, MainMenu, AnimationMenu,animations,rewards) {
    "use strict";

    var app = new Marionette.Application();

    app.addRegions({
      main : '#content'
    });

    app.mainMenu = function() {
      app.main.show(new MainMenu());
    };

    app.animationMenu = function() {
      app.main.show(new AnimationMenu());
    };

    var numGames = 0;
    app.newGame = function(){
      clearTimeout(app.newGameTimer);
      trak.event('game','new');

      var gameField;
      if (++numGames % 5 === 0) {
        gameField = rewards.balloonGame();
      } else {
        var pickableItems = datasource.shuffle().slice(0,6);
        var gameList = new Backbone.Collection(pickableItems);
        gameField = new PickableListView({ collection : gameList });
      }

      app.main.show(gameField);
    };

    app.resume = function() {
      app.mainMenu();
    };

    app.vent.on('app:start', function() {
      app.mainMenu();
    });

    app.vent.on('game:new',app.newGame);

    function delayNewGame(millis) {
      app.newGameTimer = setTimeout(function(){
        app.vent.trigger('game:new');
      }, millis);
    }

    app.vent.on('game:completed',function(){
      var animation;

      if (Math.random() > 0.5) {
        animation = animations.fireworks;
      } else {
        animation = animations.starburst;
      }

      // Wait for CSS animations to complete for performance
      setTimeout(animation,500);
      delayNewGame(6500);
    });

    app.vent.on('reward:completed',function(){
      delayNewGame(500);
    });

    function trackEvent(eventName) {
      var firstSplit = eventName.indexOf(':'),
        target = eventName.substring(0,firstSplit),
        event = eventName.substring(firstSplit+1,eventName.length);

      app.vent.on(eventName,function(){
        trak.event(target,event);
      });
    }

    // List of events we want to track for analytics
    [
      'game:completed',
      'game:new',
      'app:start',
      'app:resume',
      'reward:completed',
      'pickable:click',
      'pickable:targetClick'
    ].forEach(trackEvent);

    return app;
  }
);
