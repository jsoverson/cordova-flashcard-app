/*global define, Backbone*/

define(
  [
    'marionette',
    'underscore',
    'Trak',
    'game/definitions',
    'views/MainMenu',
    'views/AnimationMenu',
    'animations'
  ],
  function (Marionette, _, trak, GameList, MainMenu, AnimationMenu,animations) {
    "use strict";

    var app = new Marionette.Application();

    app.addRegions({
      main : '#content'
    });

    var numGames = 0;

    app.newGame = function(){
      clearTimeout(app.newGameTimer);
      trak.event('game','new');

      /*
        var Game;
        if (++numGames % 5 === 0) {
          Game = rewards.balloonGame();
        } else {
          Game = GameList.AlphabetSelection;
        }
      */

      var Game = getRandomGame();
      app.main.show(new Game());
    };

    function getRandomGame() {
      var game, arr = [];
      for(game in GameList) {
        if(GameList.hasOwnProperty(game)) arr.push(game);
      }
      return GameList[arr[~~(Math.random() * arr.length)]];
    }

    app.mainMenu = function() { app.main.show(new MainMenu()); };
    app.animationMenu = function() { app.main.show(new AnimationMenu()); };
    app.resume = function() { app.mainMenu(); };

    app.vent.on('app:start', app.mainMenu);
    app.vent.on('game:new',app.newGame);

    app.vent.on('reward:completed',function(){ delayNewGame(500); });

    app.vent.on('game:completed',function(){
      triggerAnimation();
      delayNewGame(6500);
    });

    function delayNewGame(millis) {
      app.newGameTimer = setTimeout(function(){
        app.vent.trigger('game:new');
      }, millis);
    }

    function triggerAnimation() {
      var animation;
      if (Math.random() > 0.5) {
        animation = animations.fireworks;
      } else {
        animation = animations.starburst;
      }
      // Wait for CSS animations to complete for performance
      setTimeout(animation,500);
    }

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
