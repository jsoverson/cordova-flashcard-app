/*global define*/

define(
  [
    'trak',
    'datasource/alphabet',
    'views/PickableListView',
    'views/MainMenu',
    'views/AnimationMenu',
    'application/PickableList',
    'animations',
    'rewards'
  ],
  function (trak, datasource, PickableListView, MainMenu, AnimationMenu, PickableList,animations,rewards) {
    "use strict";

    var app = new Backbone.Marionette.Application();

    app.addRegions({
      main : '#content'
    });

    app.mainMenu = function() {
      app.main.show(new MainMenu());
    }

    app.animationMenu = function() {
      app.main.show(new AnimationMenu());
    }

    var numGames = 0;
    app.newGame = function(){
      clearTimeout(app.newGameTimer);
      trak.event('game','new');

      var gameField;
      if (numGames > 0 && numGames % 4 === 0) {
        gameField = rewards.balloonGame();
      } else {
        var gameList = new PickableList(
          _(datasource.shuffle()).head(6)
        );

        gameField = new PickableListView({
          collection : gameList
        });
      }

      app.main.show(gameField);
    }

    app.resume = function() {
      trak.event('game','resume');
      app.mainMenu();
    }

    app.vent.on('game:completed',function(){
      numGames++;
      var animation;
      if (Math.random() > .5) {
        animation = animations.fireworks;
      } else {
        animation = animations.starburst;
      }
      setTimeout(animation,500);
      app.newGameTimer = setTimeout(app.newGame,6500);
    })

    app.vent.on('reward:completed',function(){
      numGames++;
      app.newGameTimer = setTimeout(app.newGame,500);
    })

    var trackableEvents = [
      'game:completed',
      'reward:completed',
      'pickable:click',
      'pickable:targetClick'
    ]

    _(trackableEvents).each(trackEvent);

    function trackEvent(eventName) {
      var firstSplit = eventName.indexOf(':')
        , target = eventName.substring(0,firstSplit)
        , event = eventName.substring(firstSplit+1,eventName.length);

      app.vent.on(eventName,function(){
        trak.event(target,event);
      })
    }

    return app;
  }
);
