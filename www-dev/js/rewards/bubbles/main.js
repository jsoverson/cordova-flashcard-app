/*global define */

define(
  [
    'application',
    'core/rewards/canvas/Item'
  ],
  function (app, RewardCanvasItem) {
    "use strict";

    var pointerX = 0,
      pointerY = 0,
      TwoPI = Math.PI * 2,
      scaleSkew = 50,
      shadowBlur = 1;

    var BubblesItem = RewardCanvasItem.extend({

      timer : 10,

      update : function(evt) {
        pointerX = evt.pageX - evt.target.offsetLeft;
        pointerY = evt.pageY - evt.target.offsetTop;
        this.draw();
      },

      shakeCallback : function() {
        this.contextClear();
      },

      getRandomColor : function() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
      },

      draw : function() {
        var bubbleColor = this.getRandomColor();
        this.context.globalCompositeOperation = "source-over";
        this.context.beginPath();
/*
        this.context.shadowBlur=10;
        this.context.shadowColor= bubbleColor;
*/
        this.context.fillStyle = bubbleColor;
        this.context.arc( pointerX, pointerY,  (1 + Math.random() * scaleSkew) , 0, TwoPI, false);
        this.context.closePath();
        this.context.fill();
      },

      onMouseMove : function(evt) {
        this.update(evt);
      },

      onTouchStart : function(evt) {
        this.update(evt);
      },

      onTouchMove : function(evt) {
        this.update(evt);
      }
    });

    return BubblesItem;
  });
