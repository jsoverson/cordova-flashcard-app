/*global define */

define(
  [
    'application',
    'core/rewards/selection/Item',
    'core/controllers/audio'
  ],
  function (app, RewardSelectionItem, audioController) {
    "use strict";

    var BalloonItem = RewardSelectionItem.extend({

      template : _.template("<div class='pickable'> <canvas></canvas> </div>"),

      onRender : function () {
        var img = document.getElementById('balloon-greyscale');
        this.canvas = this.$('canvas')[0];
        this.canvas.width = this.canvas.height = 200;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = 'hsl(' + this.model.get('hue') + ',100%,50%)';
        this.context.fillRect(0, 0, 200, 200);
        this.context.globalCompositeOperation = 'darker';
        this.context.drawImage(img, 0, 0, 200, 200);
      },

      onSelect : function() {
        //not currently working
        audioController.play('action', 'balloon-pop');

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var img = document.getElementById('cloud');
        this.context.drawImage(img, 0, 0, 200, 200);
        this.$el.addClass('transparent');
      }

    });

    return BalloonItem;
  });
