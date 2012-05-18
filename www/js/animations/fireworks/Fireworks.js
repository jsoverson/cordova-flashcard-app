/*global define*/


if (!window.requestAnimFrame) window.requestAnimFrame =
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){ window.setTimeout(callback, 1000 / 60); };

define(['animations/fireworks/Firework'], function (Firework) {
  "use strict";

  function Fireworks(canvas) {
    var self = this
      , fireworks = this.fireworks = []
      , context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.animate = function() {
      if (!self.animating) {
        self.animating = true;
        loop();
      }
    }

    function loop() {
      clearContext();
      if (drawFireworks()) {
        requestAnimFrame(loop);
      } else {
        clearContext();
        self.animating = false;
      }
    }

    function clearContext() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawFireworks() {
      var i = fireworks.length, numExpired = 0;

      while(i--) {
        var firework = fireworks[i];
        if (firework.expired) numExpired++;
        else firework.update().render(context);
      }

      return numExpired < fireworks.length;
    }
  }

  Fireworks.prototype.launch = function(options){
    var firework = new Firework(options.pos,options.hue);
    firework.onExplode = options.onExplode;
    firework.launch(options.vel);
    this.fireworks.push(firework);
    this.animate();
  }

  return Fireworks;
});
