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

      timer : 100,

      shakeCallback : function() {
        this.contextClear();
      },

      getRandomColor : function() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
      },

      onWindowResize : function() {
        this.draw();
      },

      draw : function(x,y) {
          var bubbleColor = this.getRandomColor();
          this.context.globalCompositeOperation = "source-over";
          this.context.beginPath();
          this.context.fillStyle = bubbleColor;
          this.context.arc(x,y,  (1 + Math.random() * scaleSkew) , 0, TwoPI, false);
          this.context.closePath();
          this.context.fill();
      },

      updateMouse : function(evt) {
        pointerX = evt.pageX - evt.target.offsetLeft;
        pointerY = evt.pageY - evt.target.offsetTop;
        this.draw(pointerX,pointerY);
      },

      onMouseMove : function(evt) {
        this.updateMouse(evt);
      },

      onTouchStart : function(evt) {
        this.updateTouches(evt.changedTouches);
      },

      onTouchMove : function(evt) {
        this.updateTouches(evt.changedTouches);
      },

      updateTouches : function(touches) {
        for (var i=0; i<touches.length; i++) {
          this.draw(touches[i].pageX,touches[i].pageY);
        }
      }
    });

    return BubblesItem;
  });
