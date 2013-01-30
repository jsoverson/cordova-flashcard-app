/*global define, Media, document, window*/

define(
  [
    'rewards/balloon/List',
    'rewards/bubbles/main',
    'rewards/colorBurst/main'
  ],
  function (BalloonSelection, BubbleCanvas, ColorBurstCanvas) {
    "use strict";

    var RewardDefinitions = {

      //ColorBurstCanvas Is having Issues Each 'new' it speeds up the particles
      //need to investigate further

      rewards : [BalloonSelection, BubbleCanvas],

      getRandom : function() {
        return this.rewards[~~(Math.random() * this.rewards.length)];
      }

    };

    return RewardDefinitions;
  });